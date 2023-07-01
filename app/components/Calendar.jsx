'use client';

import './Calendar.css';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function MyCalendar() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const onlyDate = dayjs(value).format();
    console.log(onlyDate);
  }, [value]);

  /* async function getEntriesByDate(dateOfEntry, userId) {
    const response = await fetch(`http://localhost:3000/api/entries?date=${dateOfEntry}`);
    const data = await response.json();
    console.log(data);

    if(data) {
      show the list of that day's entries
    }
  } */

  return <Calendar value={value} onChange={setValue} locale="en-GB" />;
}
