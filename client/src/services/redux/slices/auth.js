import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT, axioKit } from "../../utilities";

const name = "auth",
  auth = JSON.parse(localStorage.getItem("auth")) || {},
  section = JSON.parse(localStorage.getItem("section")) || {},
  role = localStorage.getItem("access"),
  maxPage = Number(localStorage.getItem("maxPage")) || 5,
  token = localStorage.getItem("token") || "",
  email = localStorage.getItem("email") || "",
  image = `${ENDPOINT}/assets/${
    localStorage.getItem("email") || ""
  }/profile.jpg`;

const initialState = {
  auth,
  role,
  token,
  email,
  image,
  section,
  maxPage,
  didLogin: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LOGIN = createAsyncThunk(`${name}/login`, (form, thunkAPI) => {
  try {
    return axioKit.login(form.email, form.password);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const UPDATE = createAsyncThunk(
  `${name}/update`,
  ({ data, token }, thunkAPI) => {
    try {
      return axioKit.update("users", data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reduxSlice = createSlice({
  name,
  initialState,
  reducers: {
    MAXPAGE: (state, data) => {
      localStorage.setItem("maxPage", data.payload);
      state.maxPage = data.payload;
    },
    RESET: (state) => {
      state.didLogin = false;
      state.isSuccess = false;
      state.message = "";
    },
    INJECTROLE: (state, data) => {
      state.role = data.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LOGIN.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(LOGIN.fulfilled, (state, action) => {
        const { success, payload } = action.payload,
          { token, user, access, section } = payload;
        console.log(payload);
        state.token = token;
        state.email = user.email;
        state.section = section;
        state.auth = user;
        state.role = access;

        state.message = success;
        state.didLogin = true;
        state.isLoading = false;
      })
      .addCase(LOGIN.rejected, (state, action) => {
        const { error } = action;
        state.message = error.message;
        state.isLoading = false;
      })

      .addCase(UPDATE.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(UPDATE.fulfilled, (state, action) => {
        const { message, payload } = action.payload;
        state.auth = payload;
        state.isLoading = false;
        state.message = message;
        state.isSuccess = true;
      })
      .addCase(UPDATE.rejected, (state, action) => {
        const { error } = action;
        state.message = error.message;
        state.isLoading = false;
      });
  },
});

export const { RESET, MAXPAGE, IMAGE, INJECTROLE, INJECTCREDENTIALS } =
  reduxSlice.actions;

export default reduxSlice.reducer;
