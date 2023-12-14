const isValidLink = (url, callback) => {
  fetch(url, { method: "HEAD" })
    .then((response) => {
      if (response.ok) {
        // Check if the server explicitly indicates an error page
        const contentType = response.headers.get("content-type");
        const isHtmlErrorPage =
          contentType && contentType.includes("text/html");

        callback(!isHtmlErrorPage);
      } else {
        // Status is not in the 200-299 range, treat it as an invalid link
        callback(false);
      }
    })
    .catch(() => {
      // Error occurred during the fetch, treat it as an invalid link
      callback(false);
    });
};

export default isValidLink;
