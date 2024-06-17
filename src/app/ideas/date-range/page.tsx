'use client'; // Optional for client-side interactions

import Head from 'next/head';
import { DateTime, Duration } from 'luxon';
import { useState } from 'react';
import TextField from '@/components/inputs/text-field';
import DateInput from '@/components/inputs/date-input';

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
      // setInvalidDuration(true);
      return;
    }

    const durationValue = parseInt(match[1], 10);
    const durationUnit = match[2].toLowerCase();

    const duration = Duration.fromObject({ [durationUnit]: durationValue });
    const endDate = startDate.plus(duration);

    return endDate.toISODate();
  };

  let endDate = calculateEndDate();

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDurationInput(event.target.value);
  };

  return (
    <main>
      <Head>
        <title>Date Time</title>
      </Head>
      <h1>Date Time using Luxon</h1>
      <DateInput label="Start Date:" onChange={setStartDate} value={startDate} />

      <TextField
        label="Duration:"
        type="text"
        id="duration"
        value={durationInput}
        onChange={handleDurationChange}
        error={invalidDuration ? 'Invalid duration format' : undefined}
      />

      <p>
        Start Date: {startDate.toISODate()} End Date: {endDate}
      </p>
    </main>
  );
};

export default DateRange;
