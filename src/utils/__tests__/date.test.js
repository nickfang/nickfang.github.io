import {
  WEEKDAYS,
  parseDate,
  validDateString,
  getDateString,
  formatForInput,
  getWeekBoundary,
  getNumWeeksPerMonth,
  getInfoPerMonth,
  getWeekDates,
} from '../date';

describe('date utils', () => {
  it('parseDate', () => {
    let date = parseDate('2023-01-01');
    expect(date.year).toBe(2023);
    expect(date.month).toBe(0);
    expect(date.weekNumber).toBe(1);

    date = parseDate('2023-12-26', 0);
    expect(date.year).toBe(2023);
    expect(date.month).toBe(11);
    expect(date.weekNumber).toBe(52);

    date = parseDate('2022-12-31', 0);
    expect(date.year).toBe(2022);
    expect(date.month).toBe(11);
    expect(date.weekNumber).toBe(53);

    date = parseDate('2024-02-28', 0);
    expect(date.year).toBe(2024);
    expect(date.month).toBe(1);
    expect(date.weekNumber).toBe(9);

    date = parseDate('2024-02-29', 0);
    expect(date.year).toBe(2024);
    expect(date.month).toBe(1);
    expect(date.weekNumber).toBe(9);

    date = parseDate('2000-02-28', 0);
    expect(date.year).toBe(2000);
    expect(date.month).toBe(1);
    expect(date.weekNumber).toBe(10);
    // Date sets a future date instead of throwing an error.
    date = parseDate('2000-02-30', 0);
    expect(date.year).toBe(2000);
    expect(date.month).toBe(2);
    expect(date.weekNumber).toBe(10);
  });
  it('validDateString', () => {
    const date = validDateString('2020-01-01');
    expect(date.valid).toBe(true);
    expect(date.year).toBe('2020');
    expect(date.month).toBe('01');
    expect(date.day).toBe('01');
    let badDate = validDateString('2020');
    expect(badDate.valid).toBe(false);
    expect(badDate.year).toBeNull();
    expect(badDate.month).toBeNull();
    expect(badDate.day).toBeNull();
    badDate = validDateString('2020-13-40');
    expect(badDate.valid).toBe(false);
    expect(badDate.year).toBeNull();
    expect(badDate.month).toBeNull();
    expect(badDate.day).toBeNull();
    badDate = validDateString('2020-01-40');
    expect(badDate.valid).toBe(false);
    expect(badDate.year).toBeNull();
    expect(badDate.month).toBeNull();
    expect(badDate.day).toBeNull();
  });
  it('getDateString', () => {
    // TODO: fix timezone issue.
    const date = new Date('2020-01-01');
    const dateString = getDateString(date);
    expect(dateString).toBe('2020-01-01');
  });
  it('formatForInput', () => {
    const date = new Date('2020-01-01');
    const dateString = formatForInput(date);
    expect(dateString).toBe('2020-01-01');
  });
  it('getWeekBoundary', () => {
    for (let i = 1; i <= 31; i++) {
      const date = new Date(`2023-01-${i}`);
      const weekBoundary = getWeekBoundary(date);
      // Check that each week starts on a Monday and ends on a Sunday.
      if (i <= 1) {
        expect(getDateString(weekBoundary.weekStart)).toBe('2022-12-26');
        expect(getDateString(weekBoundary.weekEnd)).toBe('2023-01-01');
      } else if (i >= 2 && i <= 8) {
        expect(getDateString(weekBoundary.weekStart)).toBe('2023-01-02');
        expect(getDateString(weekBoundary.weekEnd)).toBe('2023-01-08');
      } else if (i >= 9 && i <= 15) {
        expect(getDateString(weekBoundary.weekStart)).toBe('2023-01-09');
        expect(getDateString(weekBoundary.weekEnd)).toBe('2023-01-15');
      } else if (i >= 16 && i <= 22) {
        expect(getDateString(weekBoundary.weekStart)).toBe('2023-01-16');
        expect(getDateString(weekBoundary.weekEnd)).toBe('2023-01-22');
      } else if (i >= 23 && i <= 29) {
        expect(getDateString(weekBoundary.weekStart)).toBe('2023-01-23');
        expect(getDateString(weekBoundary.weekEnd)).toBe('2023-01-29');
      } else if (i >= 30 && i <= 31) {
        expect(getDateString(weekBoundary.weekStart)).toBe('2023-01-30');
        expect(getDateString(weekBoundary.weekEnd)).toBe('2023-02-05');
      }

      const weekBoundarySaturdayStart = getWeekBoundary(date, WEEKDAYS['Sunday']);
      // Check that each week starts on a Monday and ends on a Sunday.
      if (i <= 7) {
        expect(getDateString(weekBoundarySaturdayStart.weekStart)).toBe('2023-01-01');
        expect(getDateString(weekBoundarySaturdayStart.weekEnd)).toBe('2023-01-07');
      } else if (i >= 8 && i <= 14) {
        expect(getDateString(weekBoundarySaturdayStart.weekStart)).toBe('2023-01-08');
        expect(getDateString(weekBoundarySaturdayStart.weekEnd)).toBe('2023-01-14');
      } else if (i >= 15 && i <= 21) {
        expect(getDateString(weekBoundarySaturdayStart.weekStart)).toBe('2023-01-15');
        expect(getDateString(weekBoundarySaturdayStart.weekEnd)).toBe('2023-01-21');
      } else if (i >= 22 && i <= 28) {
        expect(getDateString(weekBoundarySaturdayStart.weekStart)).toBe('2023-01-22');
        expect(getDateString(weekBoundarySaturdayStart.weekEnd)).toBe('2023-01-28');
      } else if (i >= 29 && i <= 35) {
        expect(getDateString(weekBoundarySaturdayStart.weekStart)).toBe('2023-01-29');
        expect(getDateString(weekBoundarySaturdayStart.weekEnd)).toBe('2023-02-04');
      }
    }
  });
  it('getNumWeeksPerMonth', () => {
    const numWeeksPerMonth = [5, 5, 5, 5, 6, 5, 5, 6, 5, 5, 5, 5];
    for (let i = 1; i <= 12; i++) {
      const date = new Date(`2020-${i}-01`);
      const numWeeks = getNumWeeksPerMonth(date);
      expect(numWeeks.numWeeks).toBe(numWeeksPerMonth[i - 1]);
    }
  });
  it('getInfoPerMonth', () => {
    const date = new Date('2020-01-01');
    const weekBoundaries = getInfoPerMonth(date);
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
