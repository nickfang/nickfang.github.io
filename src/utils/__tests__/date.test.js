import {
  parseDate,
  validDateString,
  toDateString,
  formatForInput,
  getWeekBoundary,
  getNumWeeksPerMonth,
  getWeekBoundariesPerMonth,
  getWeekDates,
} from '../date.js';

describe('date utils', () => {
  it('parseDate', () => {
    const date = parseDate('2020-01-01');
    expect(date.year).toBe(2020);
    expect(date.month).toBe(0);
    expect(date.weekNumber).toBe(1);
  });
});
