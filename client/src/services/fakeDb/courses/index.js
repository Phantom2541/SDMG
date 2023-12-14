import junior from "./juinor.json";
import senior from "./senior.json";
import college from "./college.json";

const Courses = {
  junior,
  senior,
  college,
  collections: [...junior, ...senior, ...college],
  find: function (pk) {
    if (!pk) return {};
    return this.collections.find(({ id }) => id === Number(pk));
  },
  getAbbreviation: function (pk) {
    return this.find(pk).abbreviation;
  },
  getName: function (pk) {
    return this.find(pk).name;
  },
  displayName: function (pk) {
    const { abbreviation, name } = this.find(pk);
    return `(${abbreviation}) ${name}`;
  },
};

export default Courses;
