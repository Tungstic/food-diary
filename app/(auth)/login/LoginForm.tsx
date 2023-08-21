'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';
import styles from '../register/RegisterForm.module.scss';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function login() {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      console.log('error', data.error);
      return;
    }

    // if credentials correct, redirect to HomePageWhenLoggedIn
    router.push(getSafeReturnToPath(props.returnTo) || (`/` as Route));
    // we may have in the future revalidatePath()
    router.refresh();
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <form
        className={styles.card}
        onSubmit={(event) => event.preventDefault()}
      >
        <label>
          username:
          <input
            data-testid="login-name"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label>
          password:
          <input
            data-testid="login-password"
            value={password}
            type="password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button onClick={async () => await login()}>Log in</button>
        {error !== '' && <div>{error}</div>}
      </form>
    </div>
  );
}
