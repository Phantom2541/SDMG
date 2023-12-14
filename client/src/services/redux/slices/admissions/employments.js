import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axioKit, socket } from "../../../utilities";

const name = "admissions/employments";

const initialState = {
  collections: [],
  response: {},
  taken: {
    access: [],
    HEAD: [],
    MASTER: [],
  },
  faculty: {
    head: {},
    master: {},
    teachers: [],
  },
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const EMPLOYEES = createAsyncThunk(
  `${name}/employees`,
  ({ token, key }, thunkAPI) => {
    try {
      return axioKit.universal(`${name}/employees`, token, key);
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

export const FACULTY = createAsyncThunk(
  `${name}/faculty`,
  ({ token, key }, thunkAPI) => {
    try {
      return axioKit.universal(`${name}/faculty`, token, key);
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

export const TEACHERS = createAsyncThunk(
  `${name}/teachers`,
  ({ token, key }, thunkAPI) => {
    try {
      return axioKit.universal(`${name}/teachers`, token, key);
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

export const BROWSE = createAsyncThunk(
  `${name}/browse`,
  ({ token, key }, thunkAPI) => {
    try {
      return axioKit.universal(`${name}/browse`, token, key);
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

export const SAVE = createAsyncThunk(
  `${name}/save`,
  ({ token, data }, thunkAPI) => {
    try {
      return axioKit.save(name, data, token);
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

export const UPDATE = createAsyncThunk(
  `${name}/update`,
  ({ token, data }, thunkAPI) => {
    try {
      return axioKit.update(name, data, token);
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

// export const DESTROY = createAsyncThunk(
//   `${name}/destroy`,
//   ({ token, data }, thunkAPI) => {
//     try {
//       return axioKit.destroy(name, data, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const reduxSlice = createSlice({
  name,
  initialState,
  reducers: {
    RESET: (state, data) => {
      state.isSuccess = false;
      state.message = "";
    },
    ADDEMPLOYMENT: (state, data) => {
      state.collections.unshift(data.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(SAVE.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(SAVE.fulfilled, (state, action) => {
        const { success, payload } = action.payload,
          { employment, user } = payload;

        if (employment?.isPublished) {
          socket.emit("send_employment", { ...employment, user });
        }

        state.message = success;
        state.response = payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(SAVE.rejected, (state, action) => {
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
        const { success, payload, shouldRefresh, didUpdate } = action.payload,
          { user, employment } = payload;

        //this is for employment approval
        if (shouldRefresh) window.location.reload();

        if (user) {
          // this is for employment submission
          state.response = payload;
          state.message = success;

          if (employment?.isPublished) {
            socket.emit("send_employment", { ...employment, user });
          }
        } else {
          // this is for employment approval
          const index = state.collections.findIndex(
            (c) => c._id === employment._id
          );

          if (didUpdate) {
            state.collections[index] = employment;
            state.message = "User Account Updated Successfully.";
          } else {
            state.collections.splice(index, 1);
            state.message = "Employment Approved Successfully";
          }
        }

        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(UPDATE.rejected, (state, action) => {
        const { error } = action;
        state.message = error.message;
        state.isLoading = false;
      })

      .addCase(FACULTY.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(FACULTY.fulfilled, (state, action) => {
        const { payload } = action.payload;
        state.faculty = payload;
        state.isLoading = false;
      })
      .addCase(FACULTY.rejected, (state, action) => {
        const { error } = action;
        state.message = error.message;
        state.isLoading = false;
      })

      .addCase(TEACHERS.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(TEACHERS.fulfilled, (state, action) => {
        const { payload } = action.payload;
        state.collections = payload;
        state.isLoading = false;
      })
      .addCase(TEACHERS.rejected, (state, action) => {
        const { error } = action;
        state.message = error.message;
        state.isLoading = false;
      })

      .addCase(EMPLOYEES.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(EMPLOYEES.fulfilled, (state, action) => {
        const { payload } = action.payload;
        state.collections = payload;
        state.isLoading = false;
      })
      .addCase(EMPLOYEES.rejected, (state, action) => {
        const { error } = action;
        state.message = error.message;
        state.isLoading = false;
      })

      .addCase(BROWSE.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(BROWSE.fulfilled, (state, action) => {
        const { payload, taken } = action.payload;
        state.collections = payload;
        state.taken = taken;
        state.isLoading = false;
      })
      .addCase(BROWSE.rejected, (state, action) => {
        const { error } = action;
        state.message = error.message;
        state.isLoading = false;
      }),
});

export const { RESET, ADDEMPLOYMENT } = reduxSlice.actions;

export default reduxSlice.reducer;
