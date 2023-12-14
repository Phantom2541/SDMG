import axios from "axios";
import error from "./error";

/**
 * Destroy function.
 *
 * @param {string} entity - Base route of the API.
 * @param {Array<any>|object} data - Information that will be stored in the database.
 * @param {string} token - Authorization Token.
 * @returns {{ success: boolean, payload: Array<any>|object }} - The result object containing success and payload.
 */
const destroy = async (entity, data, token) =>
  await axios({
    method: "delete",
    url: `${entity}/destroy`,
    headers: {
      Authorization: `QTracy ${token}`,
    },
    data,
  })
    .then(({ data }) => data)
    .catch(error);

export default destroy;
