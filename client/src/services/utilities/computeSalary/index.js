function getWorkingDays(month, year, restDays) {
  // Get the total number of days in the provided month and year
  const totalDaysInMonth = new Date(year, month, 0).getDate();

  // Initialize a counter for working days
  let workingDays = 0;

  // Loop through each day of the month
  for (let day = 1; day <= totalDaysInMonth; day++) {
    // Create a Date object for the current day
    const currentDate = new Date(year, month - 1, day);

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = currentDate.getDay();

    // Check if the day is not a rest day (not included in the restDays array)
    if (!restDays.includes(getDayName(dayOfWeek))) {
      workingDays++;
    }
  }

  return workingDays;
}

// Function to get the day name from the day of the week (0 to 6)
function getDayName(dayOfWeek) {
  const dayNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return dayNames[dayOfWeek];
}

// Example usage
const month = 10; // November
const year = 2023;
const restDays = ["sunday", "saturday"];

const result = getWorkingDays(month, year, restDays);
console.log("Total working days:", result);
