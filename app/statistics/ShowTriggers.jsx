'use client';

import { useState } from 'react';

// button -> show triggers on click
export default function ShowTriggers(props) {
  const [listOfIngredients, setListOfIngredients] = useState([]);
  const symptom = props.symptom;

  async function handleClick() {
    const response = await fetch(
      `http://localhost:3000/api/symptoms/${symptom}`,
    );

    const data = await response.json();

    console.log('data', data.ingredients);
    // Object: {ingredients: [{ingredientName, ingredientCount}]}

    setListOfIngredients(data.ingredients);
    console.log('list', listOfIngredients);
  }

  return (
    <div>
      <button onClick={handleClick}>Show possible food triggers</button>

      {listOfIngredients.map((ingredient) => {
        return (
          <div key={`ingredient ${ingredient.ingredientName}`}>
            {ingredient.ingredientName}
          </div>
        );
      })}
    </div>
  );
}
