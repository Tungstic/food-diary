'use client';

import CreatableSelect from 'react-select/creatable';

const predefinedSymptoms = [
  { value: 'Nausea', label: 'Nausea' },
  { value: 'Vomiting', label: 'Vomiting' },
  { value: 'Diarrhea', label: 'Diarrhea' },
];

export default function EntryForm() {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div>Meal</div>
      <CreatableSelect options={predefinedSymptoms} />

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
