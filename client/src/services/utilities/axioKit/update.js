import axios from "axios";
import error from "./error";

/**
 * Update function.
 *
 * @param {string} entity - Base route of the API.
 * @param {Array<any>|object} data - Information that will be stored in the database.
 * @param {string} token - Authorization Token.
 * @returns {{ success: boolean, payload: Array<any>|object }} - The result object containing success and payload.
 */
const update = async (entity, data, token) =>
  await axios
    .put(`${entity}/update`, data, {
      headers: {
        Authorization: `QTracy ${token}`,
      },
    })
    .then(({ data }) => data)
    .catch(error);

export default update;
