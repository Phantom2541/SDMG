import Swal from "sweetalert2";

const error = ({ response }) => {
  const { status, data } = response,
    { error, message } = data;

  if ([401, 403].includes(status) || error === "Invalid Token") {
    Swal.fire({
      title: "Access Expired",
      icon: "error",
      text: "Please login again.",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
    }).then(() => {
      localStorage.clear();
      window.location.href = "/";
    });
  }

  throw new Error(message ? `${error}: ${message}` : error);
};

export default error;
