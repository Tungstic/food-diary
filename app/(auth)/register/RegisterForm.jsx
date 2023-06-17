'use client';

import { useState } from 'react';
import styles from './RegisterForm.module.scss';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className={styles.card} onSubmit={(event) => event.preventDefault()}>
      <label>
        create your username
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        create your password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button
      /*        onClick={async () => {
          await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
          });
        }} */
      >
        Register
      </button>
    </form>
  );
}
