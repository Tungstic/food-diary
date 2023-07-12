'use client';

import { useEffect, useState } from 'react';
import styles from './ShowEntry.module.scss';

export default function ShowEntry({ entryId }) {
  const [entry, setEntry] = useState({});
  // entryId is a string
  useEffect(() => {
    async function firstRenderFetch() {
      const response = await fetch(`/api/entries/${entryId}`);
      const data = await response.json();

      console.log('my single entry', data);
      setEntry(data.entry);
    }

    firstRenderFetch().catch((error) => console.log(error));
  }, [entryId]);

  if (Object.keys(entry).length < 1) {
    return <div style={{ minHeight: '100vh' }}>Loading...</div>;
  }
  return (
    <div className={styles.wrapper}>
      <div>
        <div>{`Meal name: ${entry.mealName}`}</div>

        <div className={styles.lists}>
          Ingredients:
          {entry.onlyIngredientNames.map((i) => {
            return <div key={`ingredient ${i}`}>{i}</div>;
          })}
        </div>
        {Object.keys(entry).includes('onlySymptomNames') && (
          <div className={styles.lists}>
            Symptoms:
            {entry.onlySymptomNames.map((i) => {
              return <div key={`symptom ${i}`}>{i}</div>;
            })}
          </div>
        )}
        <div>{`Note: ${entry.note !== '' ? entry.note : '--'}`}</div>
        <button>Edit</button>
      </div>
    </div>
  );
}
