'use client';

import './Calendar.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';

export default function MyCalendar() {
  const timeOfMeal = new Date();
  const [value, setValue] = useState(timeOfMeal.toISOString());

  /* async function getEntriesByDate(dateOfEntry, userId) {
    const response = await fetch(`http://localhost:3000/api/entries?date=${dateOfEntry}`);
    const data = await response.json();
    console.log(data);

    if(data) {
      show the list of that day's entries
    }
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
