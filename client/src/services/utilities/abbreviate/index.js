const abbreviate = (str = "") => {
  if (!str) return "";
  const obj = {
    text: "",
    code: "",
  };

  for (const text of str.split(" ")) {
    if (isNaN(Number(text))) {
      if (text.length === 2) continue;

      obj.text += text.slice(0, 1);
      continue;
    }

    obj.code = text;
  }

  if (!obj.code) delete obj.code;

  return Object.values(obj).join("-");
};

export default abbreviate;
