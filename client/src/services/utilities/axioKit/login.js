import axios from "axios";
import error from "./error";

/**
 * Login function.
 *
 * @param {string} email - E-mail Address used for authentication.
 * @param {string} password - Password used for authentication.
 * @returns {{ success: boolean, payload: object }} - The result object containing success and payload.
 */
const login = async (email, password) =>
  await axios
    .get(`auth/login?email=${email}&password=${password}`)
    .then(({ data }) => {
      const { payload } = data;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("email", payload.user.email);
      localStorage.setItem("auth", JSON.stringify(payload.user));
      localStorage.setItem(
        "credentials",
        JSON.stringify(payload.credentials || {})
      );
      localStorage.setItem("access", payload.access);

      return data;
    })
    .catch(error);

export default login;
