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
  it('validDateString', () => {
    const date = validDateString('2020-01-01');
    expect(date.valid).toBe(true);
    expect(date.year).toBe('2020');
    expect(date.month).toBe('01');
    expect(date.day).toBe('01');
    const badDate = validDateString('2020');
    expect(badDate.valid).toBe(false);
    expect(badDate.year).toBeNull();
    expect(badDate.month).toBeNull();
    expect(badDate.day).toBeNull();
  });
  it('toDateString', () => {
    // TODO: fix timezone issue.
    const date = new Date('2020-01-01');
    const dateString = toDateString(date);
    expect(dateString).toBe('2020-01-01');
  });
  it('formatForInput', () => {
    const date = new Date('2020-01-01');
    const dateString = formatForInput(date);
    expect(dateString).toBe('2020-01-01');
  });
  it('getWeekBoundary', () => {
    const date = new Date('2020-01-01');
    const weekBoundary = getWeekBoundary(date);
    expect(toDateString(weekBoundary.weekStart)).toBe('2019-12-30');
    expect(toDateString(weekBoundary.weekEnd)).toBe('2020-01-05');
  });
  it('getNumWeeksPerMonth', () => {
    const date = new Date('2020-01-01');
    const numWeeks = getNumWeeksPerMonth(date);
    expect(numWeeks.numWeeks).toBe(5);
  });
  it('getWeekBoundariesPerMonth', () => {
    const date = new Date('2020-01-01');
    const weekBoundaries = getWeekBoundariesPerMonth(date);
    expect(weekBoundaries.startDates.length).toBe(6);
    expect(weekBoundaries.numWeeks).toBe(5);
    expect(weekBoundaries.totalDays).toBe(31);
  });
  it('getWeekDates', () => {
    const weekDates = getWeekDates(1, 2020);
    expect(weekDates.weekDates.length).toBe(5);
    expect(weekDates.weekDates).toEqual([
      '2020-01-26',
      '2020-02-02',
      '2020-02-09',
      '2020-02-16',
      '2020-02-23',
    ]);
    expect(weekDates.numWeeks).toEqual(5);
  });
});
