const globalSearch = (collection, key) =>
  collection.filter((obj) => {
    if (!obj) return false;

    if (typeof obj === "object") {
      let nestedResults = globalSearch(Object.values(obj), key);
      return nestedResults.length > 0;
    }

    return String(obj).toUpperCase().includes(key);
  });

export default globalSearch;
