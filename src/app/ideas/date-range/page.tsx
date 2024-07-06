'use client'; // Optional for client-side interactions

import Head from 'next/head';
import { DateTime, Duration } from 'luxon';
import { useState } from 'react';
import {
  getNumWeeksPerMonth,
  getInfoPerMonth,
  getWeekBoundary,
  getWeekDates,
  getDateString,
} from '@/utils/date';
import TextField from '@/components/inputs/TextField';
import DateInput from '@/components/inputs/DateInput';
import AnimatedIcon from '@/components/displays/AnimatedIcon';

const DateRange = () => {
  const now = DateTime.now();
  const [startDate, setStartDate] = useState<DateTime>(now);
  const [durationInput, setDurationInput] = useState('');
  const [invalidDuration, setInvalidDuration] = useState(false);

  const calculateEndDate = () => {
    const Units = ['years', 'months', 'days', 'hours'];

    const durationRegex = /^(\d+)\s*(week|day|month|hour)s?$/i;
    const match = durationInput.match(durationRegex);
    if (!match) {
      return;
    }

    const durationValue = parseInt(match[1], 10);
    const durationUnit = match[2].toLowerCase();

    const duration = Duration.fromObject({ [durationUnit]: durationValue });
    const endDate = startDate.plus(duration);

    return endDate.toISODate();
  };

  let endDate = calculateEndDate();

  const jsdate = startDate.toJSDate();
  const weekBoundary = getWeekBoundary(jsdate);
  const wbStart = getDateString(weekBoundary.weekStart);
  const wbEnd = getDateString(weekBoundary.weekEnd);
  const numWeeksPerMonth = getNumWeeksPerMonth(jsdate);
  const infoPerMonth = getInfoPerMonth(jsdate);
  const weekDates = getWeekDates(jsdate.getMonth(), jsdate.getFullYear());

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDurationInput(event.target.value);
  };

  return (
    <main>
      <Head>
        <title>Date Time</title>
      </Head>
      <h1>Date Duration Using Luxon</h1>
      <DateInput label="Start Date:" onChange={setStartDate} value={startDate} />

      <TextField
        label="Duration:"
        type="text"
        id="duration"
        value={durationInput}
        onChange={handleDurationChange}
        error={invalidDuration ? 'Invalid duration format' : undefined}
      />

      <div>Start Date: {startDate.toISODate()}</div>
      <div>End Date: {endDate}</div>
      <div>
        Week Boundary Start: {wbStart} - Week Boundary End: {wbEnd}
      </div>
      <div>Number of Weeks in Month: {numWeeksPerMonth.numWeeks}</div>
      <div>
        This Month Weeks Start Dates:{' '}
        {infoPerMonth.startDates.map((dateStr: string) => (
          <div key={dateStr}>{dateStr}</div>
        ))}
      </div>
      <div>This Months number of Weeks: {infoPerMonth.numWeeks}</div>
      <div>This Months number of Days: {infoPerMonth.totalDays}</div>
      <div>
        Week Dates:{' '}
        {weekDates.weekDates.map((dateStr: string) => (
          <div key={dateStr}>{dateStr}</div>
        ))}
      </div>
      <div>Num Weeks: {weekDates.numWeeks}</div>
    </main>
  );
};

export default DateRange;
