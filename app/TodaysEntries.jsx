'use client';

import { useEffect, useState } from 'react';

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

  if (listOfEntries.length > 0) {
    return (
      <div>
        <div>The meals you logged today</div>
        <div>
          {listOfEntries.map((entry) => {
            return (
              <div key={`meal number ${entry.id}`}>
                <div>{entry.mealName}</div>
                <div>{entry.note}</div>
                <div>
                  {entry.onlyIngredientNames.map((i) => {
                    return <div key={`ingredient ${i}`}>{i}</div>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
