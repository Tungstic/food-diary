import { cookies } from 'next/headers';
import { getUserBySessionToken } from '../database/users';
import MyCalendar from './components/EntriesAndCalendar';
import TodaysEntries from './EntriesByDate';
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
      <>
        <div>Welcome!</div>
        <div>info about the app</div>
      </>
    );
  }

  return (
    <div className={styles.content}>
      <MyCalendar user={user.id} />
    </div>
  );
}
