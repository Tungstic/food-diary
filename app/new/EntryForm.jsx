'use client';

import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

export default function EntryForm(props) {
  //this is array of input objects (user's choice)
  // {value: '', label: '', __isNew__: boolean}
  const [value, setValue] = useState([]);
  const [newSymptom, setNewSymptom] = useState('');
  // get an array of objects from DB symptoms table (keys: id, symptomName, userId)
  const symptomsFromDB = props.symptoms;
  const currentUserId = props.user;

  const symptomDropdown = symptomsFromDB.map((symptom) => {
    return { value: symptom.symptomName, label: symptom.symptomName };
  });

  function handleCreate(newOption) {
    setValue(newOption);

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

    console.log('my data from user', data);
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div>Meal</div>
      <CreatableSelect
        isMulti
        isSearchable
        options={symptomDropdown}
        onChange={handleCreate}
      />

      <label>
        Ingredients:
        <input />
      </label>
      <label>
        Symptoms:
        <input />
      </label>
      <div>time of meal: react-date-time-picker</div>
      {newSymptom !== '' && (
        <button onClick={saveNewSymptom}>Save new symptom</button>
      )}
    </form>
  );
}
