'use client';

import './Calendar.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';

export default function MyCalendar() {
  const [value, setValue] = useState(new Date());

  return (
    <Calendar
      // onClickDay={(event) => alert('Hello')} - attach my fn for redirect to entries on that day
      onChange={setValue}
      value={value}
      locale="en-GB"
    />
  );
}
