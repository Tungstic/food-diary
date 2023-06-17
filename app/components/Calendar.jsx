'use client';

import 'react-calendar/dist/Calendar.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';

export default function MyCalendar() {
  const [value, setValue] = useState(new Date());

  return (
    <Calendar
   
      onChange={setValue}
      value={value}
      locale="en-GB"
    />
  );
}
