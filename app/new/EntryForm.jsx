'use client';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import CreatableSelect from 'react-select/creatable';
import styles from './EntryForm.module.scss';

export default function EntryForm(props) {
  // this is array of input objects (user's choice)
  // {value: '', label: '', __isNew__: boolean}
  const choiceOfSymptoms = [];
  const choiceOfIngredients = [];
  // value property from the above object (created by user, new to DB)
  const [newSymptom, setNewSymptom] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  // string as a name, input's text value
  const [mealName, setMealName] = useState('');
  // current local date (with time) for Date Picker
  const [mealDate, setMealDate] = useState(Date());
  // Date Picker only rendered after page's mounted (to avoid hydration error)
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

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

  function handleCreateIngredient(newOption) {
    choiceOfIngredients.push(newOption);
    const usersInput = newOption.find((option) => option.__isNew__ === true);
    if (usersInput) {
      setNewIngredient(usersInput.value);
    }
  }

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

  async function saveNewEntry() {
    const response = await fetch('/api/entries', {
      method: 'POST',
      body: JSON.stringify({
        mealName: mealName,
        userId: currentUserId,
        dateOfMeal: mealDate,
        note: 'bla',
      }),
    });

    const data = await response.json();

    console.log('new entry', data);

    /* const entryId = data.id;

    const response2 = await fetch(`api/entries/${entryId}`, {
      method: 'GET',
    });
    const data2 = await response.json();
    console.log('entry2', data2); */
  }

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <label>
        Name your meal (e.g. pizza, soup with dumplings, cevapcici)
        <input
          required
          onChange={(event) => setMealName(event.currentTarget.value)}
        />
      </label>
      <div className={styles.symptomsInput}>
        <div>Choose ingredients that might trigger symptoms</div>
        <CreatableSelect
          required
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
          required
          className={styles.select}
          isMulti
          isSearchable
          options={symptomDropdown}
          onChange={handleCreateSymptom}
        />
      </div>

      <label htmlFor="note">
        Note
        <textarea
          name="note"
          maxLength={150}
          placeholder="Feeling heavy after food"
        />
      </label>
      {hasMounted === true && (
        <DatePicker
          aria-label="pick the entry's date"
          locale="en-US"
          onChange={setMealDate}
          value={mealDate}
        />
      )}

      {newSymptom !== '' && (
        <button onClick={saveNewSymptom}>Save new symptom</button>
      )}
      {newIngredient !== '' && (
        <button onClick={saveNewIngredient}>Save new ingredient</button>
      )}
      <button onClick={saveNewEntry}>Save the entry</button>
    </form>
  );
}
