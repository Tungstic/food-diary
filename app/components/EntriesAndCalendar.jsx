'use client';

import './Calendar.css';
import dayjs from 'dayjs';
import Link from 'next/link';
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
      const response = await fetch(`/api/entries?date=${onlyDate}`);
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
      <div className={styles.withEntries}>
        <div style={{ margin: '16px', marginLeft: '32px', fontSize: '1.3rem' }}>
          {`No meals logged on ${value.toString().slice(0, 10)}`}
        </div>
        <Calendar value={value} onChange={setValue} locale="en-GB" />
      </div>
    );
  }

  if (listOfEntries.length > 0) {
    return (
      <div className={styles.withEntries}>
        <div>
          <div
            style={{ marginLeft: '32px', fontSize: '1.3rem' }}
          >{`Meals you logged on ${value.toString().slice(0, 10)}`}</div>
          <ul style={{ listStyle: 'none' }}>
            {listOfEntries.map((entry) => {
              return (
                <Link href={`/${entry.id}`} key={`meal number ${entry.id}`}>
                  <li className={styles.singleEntry}>
                    <div>{`Meal: ${entry.mealName}`}</div>

                    <div className={styles.listOfIngredients}>
                      Ingredients:
                      {entry.onlyIngredientNames.map((item, index) => {
                        return (
                          <div key={`ingredient ${item}`}>
                            {index > 0 && '/ '}
                            {item}
                          </div>
                        );
                      })}
                    </div>
                    {Object.keys(entry).includes('onlySymptomNames') && (
                      <div className={styles.listOfIngredients}>
                        Symptoms:
                        {entry.onlySymptomNames.map((item, index) => {
                          return (
                            <div key={`symptom ${item}`}>
                              {index > 0 && '/ '}
                              {item}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div>{`Note: ${
                      entry.note !== '' ? entry.note : '--'
                    }`}</div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <Calendar
          maxDate={new Date()}
          value={value}
          onChange={setValue}
          locale="en-GB"
        />
      </div>
    );
  }
}
