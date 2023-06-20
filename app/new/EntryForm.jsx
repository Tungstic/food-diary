'use client';

import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

export default function EntryForm(props) {
  const [value, setValue] = useState('');

  // get an array of objects from DB symptoms table (keys: id, symptomName, userId)
  const symptomsFromDB = props.symptoms;

  const symptomDropdown = symptomsFromDB.map((symptom) => {
    return { value: symptom.symptomName, label: symptom.symptomName };
  });

  async function saveNewSymptom() {
    const response = await fetch('/api/symptoms', {
      method: 'POST',
      body: JSON.stringify({ symptomName: 'test', userId: 3 }),
    });

    const data = await response.json();

    console.log('my data from user', data);
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div>Meal</div>
      <CreatableSelect
        isMulti
        options={symptomDropdown}
        // use getNewOptionData??
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
    </form>
  );
}
