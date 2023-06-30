'use client';

import './Calendar.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';

export default function MyCalendar() {
  const [value, setValue] = useState(new Date());

  /* async function getEntriesByDate(date, userId) {
    const response = await fetch(`http://localhost:3000/api/entries/${date}`);
  } */

  return (
    <Calendar
      value={value}
      onChange={(value) => {
        setValue(value);
        console.log(value);
      }}
      locale="en-GB"
    />
  );
}
