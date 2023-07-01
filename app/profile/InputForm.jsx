'use client';

import { useState } from 'react';

export default function InputForm() {
  const [valueFromUser, setValueFromUser] = useState('');

  function handleInput(event) {
    setValueFromUser(event.currentTarget.value);
  }

  return (
    <label>
      Add new
      <input
        style={{ marginLeft: '8px' }}
        value={valueFromUser}
        onChange={handleInput}
      />
    </label>
  );
}
