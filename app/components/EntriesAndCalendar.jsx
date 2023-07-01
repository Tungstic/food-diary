'use client';

import './Calendar.css';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import styles from './EntriesAndCalendar.module.scss';

export default function EntriesAndCalendar() {
  const [listOfEntries, setListOfEntries] = useState([]);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const requiredDate = dayjs(value).format();

    const onlyDate = requiredDate.slice(0, 10);
    console.log(onlyDate);
    async function getEntriesByDate() {
      const response = await fetch(
        `http://localhost:3000/api/entries?date=${onlyDate}`,
      );
      const data = await response.json();
      console.log(data);
      setListOfEntries(data.entries);
      console.log(data.entries);
    }

    getEntriesByDate().catch((error) => {
      console.log(error);
    });
  }, [value]);

  if (listOfEntries.length < 1) {
    return (
      <>
        <div style={{ margin: '16px' }}>No meals logged</div>
        <Calendar value={value} onChange={setValue} locale="en-GB" />
      </>
    );
  }

  if (listOfEntries.length > 0) {
    return (
      <div className={styles.withEntries}>
        <div>
          <div style={{ margin: '16px' }}>{`The meals you logged on ${value
            .toString()
            .slice(0, 10)}`}</div>
          <ul>
            {listOfEntries.map((entry) => {
              return (
                <li
                  className={styles.singleEntry}
                  key={`meal number ${entry.id}`}
                >
                  <div>{`Meal ${entry.mealName}`}</div>
                  <div>Note:{entry.note}</div>
                  <div className={styles.listOfIngredients}>
                    Ingredients:
                    {entry.onlyIngredientNames.map((i) => {
                      return <div key={`ingredient ${i}`}>{i}</div>;
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <Calendar value={value} onChange={setValue} locale="en-GB" />
      </div>
    );
  }
}
