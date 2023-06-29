'use client';

import { useEffect, useState } from 'react';
import styles from './TodaysEntries.module.scss';

export default function TodaysEntries() {
  const [listOfEntries, setListOfEntries] = useState([]);

  useEffect(() => {
    async function getTodaysEntries() {
      const response = await fetch('http://localhost:3000/api/entries');
      const data = await response.json();
      console.log(data);
      setListOfEntries(data.entries);

      console.log(data.entries);
    }

    getTodaysEntries().catch((error) => {
      console.log(error);
    });
  }, []);

  if (listOfEntries.length < 1) {
    return <div style={{ margin: '16px' }}>No meals logged today</div>;
  }

  if (listOfEntries.length > 0) {
    return (
      <div>
        <div style={{ margin: '16px' }}>The meals you logged today</div>
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
    );
  }
}
