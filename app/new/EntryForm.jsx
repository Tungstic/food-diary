'use client';

import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import styles from './EntryForm.module.scss';

export default function EntryForm(props) {
  // this is array of input objects (user's choice)
  // {value: '', label: '', __isNew__: boolean}
  // const [value, setValue] = useState([]);
  const choiceOfSymptoms = [];
  const choiceOfIngredients = [];
  const [newSymptom, setNewSymptom] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  // get an array of objects from DB symptoms table (keys: id, symptomName, userId)
  const symptomsFromDB = props.symptoms;
  const currentUserId = props.user;
  const ingredientsFromDB = props.ingredients;

  const ingredientDropdown = ingredientsFromDB.map((ingredient) => {
    return {
      value: ingredient.ingredientName,
      label: ingredient.ingredientName,
    };
  });

  function handleCreateIngredient(newOption) {
    choiceOfIngredients.push(newOption);
    const usersInput = newOption.find((option) => option.__isNew__ === true);
    if (usersInput) {
      setNewIngredient(usersInput.value);
    }
  }

  const symptomDropdown = symptomsFromDB.map((symptom) => {
    return { value: symptom.symptomName, label: symptom.symptomName };
  });

  function handleCreateSymptom(newOption) {
    choiceOfSymptoms.push(newOption);

    const usersInput = newOption.find((option) => option.__isNew__ === true);
    if (usersInput) {
      setNewSymptom(usersInput.value);
    }
  }
  // save new symptom on submitting new entry??
  async function saveNewSymptom() {
    const response = await fetch('/api/symptoms', {
      method: 'POST',
      body: JSON.stringify({ symptomName: newSymptom, userId: currentUserId }),
    });

    const data = await response.json();

    console.log('new symptom from user', data);
  }

  async function saveNewIngredient() {
    const response = await fetch('/api/ingredients', {
      method: 'POST',
      body: JSON.stringify({
        ingredientName: newIngredient,
        userId: currentUserId,
      }),
    });

    const data = await response.json();

    console.log('new ingredient from user', data);
  }

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <div className={styles.symptomsInput}>
        <div>Choose ingredients that might trigger symptoms</div>
        <CreatableSelect
          className={styles.select}
          isMulti
          isSearchable
          options={ingredientDropdown}
          onChange={handleCreateIngredient}
        />
      </div>
      <div className={styles.symptomsInput}>
        <div>Choose symptoms you're experiencing</div>
        <CreatableSelect
          className={styles.select}
          isMulti
          isSearchable
          options={symptomDropdown}
          onChange={handleCreateSymptom}
        />
      </div>

      <div>time of meal: react-date-time-picker</div>
      {newSymptom !== '' && (
        <button onClick={saveNewSymptom}>Save new symptom</button>
      )}
      {newIngredient !== '' && (
        <button onClick={saveNewIngredient}>Save new ingredient</button>
      )}
    </form>
  );
}
