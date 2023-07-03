'use client';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import styles from './EntryForm.module.scss';

export default function EntryForm(props) {
  // CreatableSelect: newOption is array of input objects (user's choice)
  // {value: '', label: '', __isNew__: boolean}
  // array of strings (symptoms/ingredients) that represent only user's choice - TO BE SENT TO ENTRIES & tables
  const [symptomChoice, setSymptomChoice] = useState([]);
  const [ingredientChoice, setIngredientChoice] = useState([]);
  // value property from the above object (created by user, new to DB)
  const [newSymptom, setNewSymptom] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  // string as a name, input's text value
  const [mealName, setMealName] = useState('');
  const [note, setNote] = useState('');

  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();

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
    setIngredientChoice(newOption.map((option) => option.value));
    console.log(ingredientChoice);
    // find the new ingredient created by user (if any)
    const usersInput = newOption.find((option) => option.__isNew__ === true);
    if (usersInput) {
      setNewIngredient(usersInput.value);
    }
  }

  function handleSymptomChoice(newOption) {
    setSymptomChoice(newOption.map((option) => option.value));

    console.log(symptomChoice);
    // find the new symptom created by user (if any)
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

    if (data) {
      setIsDisabled(false);
    }
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

    if (data) {
      setIsDisabled(false);
    }
  }
  async function saveNewEntry() {
    const response = await fetch('/api/entries', {
      method: 'POST',
      body: JSON.stringify({
        mealName: mealName,
        userId: currentUserId,

        note: note,
        // sent the user's choice
        // use ids of symptoms/i instead of names??
        symptoms: symptomChoice,
        ingredients: ingredientChoice,
      }),
    });

    const data = await response.json();
    console.log('new entry', data);

    if (data) {
      router.push('/');
    }
  }

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <label>
        Name your meal (e.g. pizza, soup with dumplings, cevapcici)
        <input
          required
          className={styles.dish}
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
          onChange={handleIngredientChoice}
        />
      </div>
      <div className={styles.symptomsInput}>
        <div>Choose symptoms if you're experiencing any</div>
        <CreatableSelect
          className={styles.select}
          isMulti
          isSearchable
          options={symptomDropdown}
          onChange={handleSymptomChoice}
        />
      </div>
      <div className={styles.noteWrapper}>
        <label htmlFor="note">
          Note</label>
          <textarea
            className={styles.note}
            name="note"
            maxLength={150}
            placeholder="Feeling heavy after food"
            value={note}
            onChange={(event) => setNote(event.currentTarget.value)}
          />

      </div>

      {newSymptom !== '' && (
        <button onClick={saveNewSymptom}>Save new symptom</button>
      )}
      {newIngredient !== '' && (
        <button onClick={saveNewIngredient}>Save new ingredient</button>
      )}
      {/*   disable that button until new symptoms/i are saved to DB */}
      {mealName !== '' &&
      ingredientChoice.length > 0 &&
      newIngredient === '' &&
      newSymptom === '' ? (
        <button onClick={saveNewEntry}>Save the entry</button>
      ) : (
        <button disabled={isDisabled} onClick={saveNewEntry}>
          Save the entry
        </button>
      )}
    </form>
  );
}
