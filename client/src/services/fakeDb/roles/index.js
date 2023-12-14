import collections from "./collections.json";

const Roles = {
  collections,
  getStr: (v) => collections.find(({ value }) => v === value).str,
};

export default Roles;
