'use client';

import { useEffect, useState } from 'react';

export default function TodaysEntries() {
  const [listOfEntries, setListOfEntries] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function getTodaysEntries() {
      const response = await fetch('http://localhost:3000/api/entries');
      const data = await response.json();
      console.log(data);
      setListOfEntries(data.entries);
      setIngredients(data.ingredients);
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
                <div>{JSON.stringify(ingredients)}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
