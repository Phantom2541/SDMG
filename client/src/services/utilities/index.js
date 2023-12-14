import io from "socket.io-client";
import axioKit from "./axioKit";
import handlePagination from "./pagination";
import Male from "../../assets/male.jpg";
import Female from "../../assets/female.jpg";
import bulkPayload from "./bulkPayload";
import globalSearch from "./globalSearch";
import capitalize from "./capitalize";
import swalConfirmation from "./swalConfirmation";
import fullName from "./fullName";
import fullAddress from "./fullAddress";
import formatGradeLvl from "./formatGradeLvl";
import getAge from "./getAge";
import formatMobile from "./formatMobile";
import abbreviate from "./abbreviate";
import isValidLink from "./isValidLink";
import generateSY from "./generateSY";
import isValidImage from "./isValidImage";

const ENDPOINT = "http://localhost:5001";
// const ENDPOINT = window.location.origin;
const socket = io.connect(ENDPOINT);

const PresetImage = (gender) => {
  if (gender) return Male;

  return Female;
};

export {
  isValidImage,
  generateSY,
  isValidLink,
  abbreviate,
  formatMobile,
  getAge,
  formatGradeLvl,
  fullAddress,
  fullName,
  swalConfirmation,
  capitalize,
  PresetImage,
  ENDPOINT,
  axioKit,
  socket,
  handlePagination,
  bulkPayload,
  globalSearch,
};
