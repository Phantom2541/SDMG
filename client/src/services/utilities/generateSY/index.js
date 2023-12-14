//created for aug-may

const generateSY = (text = false) => {
  const date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth();

  let start = year,
    end = year + 1;

  // less than july
  if (month <= 7) {
    start = year - 1;
    end = year;
  }

  if (text) return `${start} - ${end}`;

  return { start, end };
};

export default generateSY;
