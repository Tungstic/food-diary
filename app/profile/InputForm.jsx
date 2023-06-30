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
      <input value={valueFromUser} />
    </label>
  );
}
