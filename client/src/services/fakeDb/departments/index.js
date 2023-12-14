import collections from "./collections.json";

const Departments = {
  collections,
  find: function (pk) {
    return this.collections.find(({ key }) => key === pk);
  },
  getName: function (pk) {
    return this.find(pk).name;
  },
  getGradeLevels: function (pk) {
    return this.find(pk)?.gradeLevels;
  },
  getInitialGrade: function (pk) {
    return this.getGradeLevels(pk)[0];
  },
};

export default Departments;
