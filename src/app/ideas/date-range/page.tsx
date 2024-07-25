'use client'; // Optional for client-side interactions

import Head from 'next/head';
import { DateTime, Duration } from 'luxon';
import { useState } from 'react';
import {
  getNumWeeksPerMonth,
  getInfoPerMonth,
  getWeekBoundary,
  getWeekDatesByMonthYear,
  getDateString,
  WEEKDAYS,
} from '@/utils/date';
import TextField from '@/components/inputs/TextField';
import DateInput from '@/components/inputs/DateInput';

const DateRange = () => {
  const now = DateTime.now();
  const [startDate, setStartDate] = useState<DateTime>(now);
  const [durationInput, setDurationInput] = useState('');
  const [invalidDuration, setInvalidDuration] = useState(false);

  const calculateEndDate = () => {
    const durationRegex = /^(\d+)\s*(hour|week|day|month|year)s?$/i;
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
  const infoPerMonth = getInfoPerMonth(jsdate, WEEKDAYS['Sunday']);
  const weekDates = getWeekDatesByMonthYear(jsdate.getMonth(), jsdate.getFullYear());

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDurationInput(event.target.value);
  };

  return (
    <main>
      <Head>
        <title>Date Time</title>
      </Head>
      <h1>Date Duration Using Luxon</h1>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <div className="mt-8 flex">
            <div className="mx-4 flex-1">
              <DateInput label="Start Date:" onChange={setStartDate} value={startDate} />
            </div>
            <div className="mx-4 flex-1">
              <TextField
                label="Duration:"
                type="text"
                id="duration"
                value={durationInput}
                onChange={handleDurationChange}
                error={invalidDuration ? 'Invalid duration format' : undefined}
              />
            </div>
          </div>
          <div>
            <div className="flex">
              <div className="mx-4 flex-1">Start Date: {startDate.toISODate()}</div>
              <div className="mx-4 flex-1">End Date: {endDate ? endDate : '<set duration>'}</div>
            </div>
          </div>
        </div>
        <hr></hr>
        <h4 className="text-left">
          Date Functions for Start Date: {getDateString(startDate.toJSDate())}
        </h4>
        <div>
          <div>getWeekBoundary()</div>
          <div className="mx-4">
            <div>Week Boundary Start: {wbStart}</div>
            <div>Week Boundary End: {wbEnd}</div>
          </div>
        </div>
        <div>
          <div>getNumWeeksPerMonth()</div>
          <div className="mx-4">
            Number of Weeks in <span>{}</span>Month: {numWeeksPerMonth.numWeeks}
          </div>
        </div>
        <div>
          <div>getInfoPerMonth()</div>
          <div className="mx-4">
            <p>Sunday start dates for each week in the month of {infoPerMonth.month}</p>
            <div className="mx-4">
              {infoPerMonth.startDates.map((dateStr: string) => (
                <div key={dateStr}>{dateStr}</div>
              ))}
            </div>
            <div>
              <p>This Months number of Weeks: {infoPerMonth.numWeeks}</p>
            </div>
            <div>
              <p>This Months number of Days: {infoPerMonth.totalDays} </p>
            </div>
            <div>
              Week Dates:{' '}
              {weekDates.weekDates.map((dateStr: string) => (
                <div key={dateStr}>{dateStr}</div>
              ))}
            </div>
            <div>Num Weeks: {weekDates.numWeeks}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DateRange;
