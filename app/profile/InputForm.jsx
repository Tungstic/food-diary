'use client';

import { useState } from 'react';
import Select from 'react-select/creatable';

export default function InputForm(props) {
  const [newSymptom, setNewSymptom] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  // get an array of objects from DB symptoms/ingredients table (keys: id, symptomName, userId)
  const symptomsFromDB = props.symptoms;

  const ingredientsFromDB = props.ingredients;
  // logged in user
  const currentUserId = props.user;

  // dropdowns for Select elements (data from DB before user creates new DB rows)
  const ingredientDropdown = ingredientsFromDB.map((ingredient) => {
    return {
      value: ingredient.ingredientName,
      label: ingredient.ingredientName,
    };
  });
  const symptomDropdown = symptomsFromDB.map((symptom) => {
    return { value: symptom.symptomName, label: symptom.symptomName };
  });

  function handleIngredientChoice(newOption) {
    // find the new ingredient created by user (if any)
    const usersInput = newOption.find((option) => option.__isNew__ === true);
    if (usersInput) {
      setNewIngredient(usersInput.value);
    }
  }

  function handleSymptomChoice(newOption) {
    console.log(newOption);
    // find the new symptom created by user (if any)
    if (newOption.__isNew__ === true) {
      setNewSymptom(newOption.value);
      console.log('newSymptom is', newSymptom);
    }
  }

  return (
    <>
      <div>List of symptoms</div>
      <Select isClearable isSearchable options={symptomDropdown} />
      <div>List of ingredients</div>
      <Select isClearable isSearchable options={ingredientDropdown} />
    </>
  );
}
