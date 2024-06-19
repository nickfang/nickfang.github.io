// new Date() creates a date object at UTC time.
// Currently these functions are not timezone aware.
// When a date instance is used in a function, it is modified in place.

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

// TODO: needs to be refactored and made more efficient  maybe memoize or figure out an equation
function parseDate(dateStr: string, startDay = 0) {
  try {
    const dateObj = new Date(dateStr);
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth();
    // console.log({ year, month, dateStr });
    const dateItr = new Date(`${year}-01-01`);
    // adjust for selected start day of the week
    const offset = dateItr.getUTCDay() - startDay;
    const adjustedOffset = offset < 0 ? offset + 7 : offset;
    dateItr.setUTCDate(1 - adjustedOffset);

    const weeks = [];
    while (dateItr.toISOString().split('T')[0] <= dateStr) {
      weeks.push(dateItr.toISOString().split('T')[0]);
      dateItr.setUTCDate(dateItr.getUTCDate() + 7);
    }
    const weekNumber = weeks.length;
    return { year, month, weekNumber };
  } catch (error) {
    console.log(error);
    return { year: null, month: null, weekNumber: null };
  }
}

// might be better to validate through sequelize.
function validDateString(dateStr: string) {
  const regex = /(([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  const found = dateStr.match(regex);
  if (found) {
    return {
      year: found[2],
      month: found[3],
      day: found[4],
      valid: true,
    };
  }
  return {
    valid: false,
    year: null,
    month: null,
    day: null,
  };
}

const getDateString = (date: Date) => {
  const format2Digit = (int: number) => `0${int}`.slice(-2);
  // Make a copy so we don't modify the original date
  const localDate = new Date(date);
  const year = localDate.getUTCFullYear();
  const month = format2Digit(localDate.getUTCMonth() + 1);
  const day = format2Digit(localDate.getUTCDate());
  const displayDate = `${year}-${month}-${day}`;
  return displayDate;
};

function formatForInput(date: Date) {
  // Make a copy so we don't modify the original date
  const localDate = new Date(date);
  const format2Digit = (int: number) => ('0' + int).slice(-2);
  const displayDate = `${localDate.getUTCFullYear()}-${format2Digit(localDate.getUTCMonth() + 1)}-${format2Digit(date.getUTCDate())}`;
  return displayDate;
}

// return the start of the week and the end of the week.
// by default the start day is a Monday
function getWeekBoundary(date: Date, startDay = 1) {
  // Make a copy so we don't modify the original date
  const localDate = new Date(date);
  const start = localDate.getUTCDate() - ((7 + localDate.getUTCDay() - startDay) % 7);
  const weekStart = new Date(localDate.setUTCDate(start));
  const weekStartDate = weekStart.getUTCDate();
  const weekEnd = new Date(localDate.setUTCDate(weekStartDate + 6));
  return { weekStart, weekEnd };
}

function getNumWeeksPerMonth(date: Date) {
  // Make a copy so we don't modify the original date
  const localDate = new Date(date);
  if (localDate.getUTCDay() !== 1) localDate.setUTCDate(1);
  const start = localDate.getUTCDay();
  const totalDays = new Date(
    localDate.getUTCFullYear(),
    localDate.getUTCMonth() + 1,
    0
  ).getUTCDate();
  const numWeeks = Math.ceil((start + totalDays) / 7);

  return { numWeeks };
}

/**
 * Returns the start and end dates for every week in a month.  The week range = [i, i+1).
 * @param {Date} date - Created new Date can be any day of the month.
 */
function getInfoPerMonth(date: Date) {
  // Make a copy so we don't modify the original date
  const localDate = new Date(date);
  localDate.setUTCDate(1);
  const startOffset = localDate.getUTCDay();
  localDate.setUTCMonth(localDate.getUTCMonth() + 1);
  localDate.setUTCDate(0);
  const totalDays = localDate.getUTCDate();
  const numWeeks = Math.ceil((startOffset + totalDays) / 7);
  localDate.setUTCDate(1 - startOffset);
  const startDates = [localDate.toISOString().split('T')[0]];
  for (let i = 0; i < numWeeks; i++) {
    localDate.setUTCDate(localDate.getUTCDate() + 7);
    startDates.push(localDate.toISOString().split('T')[0]);
  }
  return { startDates, numWeeks, totalDays, startOffset };
}

function getWeekDates(month: number, year: number, startDay = 0) {
  const date: Date = new Date(year, month, 1);
  const offset = date.getUTCDay() - startDay;
  // if the offset is negative we are starting after the first of the month.  Make offset a week earlier.
  const adjustedOffset = offset < 0 ? offset + 7 : offset;
  date.setUTCDate(1 - adjustedOffset);
  const weekDates = [];
  while (date.getUTCMonth() <= month) {
    weekDates.push(date.toISOString().split('T')[0]);
    date.setUTCDate(date.getUTCDate() + 7);
  }
  const numWeeks = weekDates.length;
  return { weekDates, numWeeks };
}

export {
  MONTHS,
  WEEKDAYS,
  parseDate,
  validDateString,
  getDateString,
  formatForInput,
  getWeekBoundary,
  getNumWeeksPerMonth,
  getInfoPerMonth,
  getWeekDates,
};
