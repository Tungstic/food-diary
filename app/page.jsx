import { cookies } from 'next/headers';
import { getUserBySessionToken } from '../database/users';
import EntriesAndCalendar from './components/EntriesAndCalendar';
import styles from './Home.module.scss';

export default async function HomePage() {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    return (
      <div className={styles.content}>
        <div>
          <div>
            Digital diary helping you identify your food triggers by tracking
            your diet and symptoms
          </div>
          <div>
            <div>
              Log every meal including ingredients and symptoms that you want to
              track
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <EntriesAndCalendar />
    </div>
  );
}
