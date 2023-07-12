import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
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
        <div className={styles.about}>
          <h1>Digital Food Diary</h1>
          <div>
            Helping you identify your food triggers by tracking your diet and
            symptoms
          </div>
          <Link href="/register">Try it</Link>
        </div>
        <Image
          src="/homeImage.avif"
          priority
          unoptimized
          width={450}
          height={550}
        />
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <EntriesAndCalendar />
    </div>
  );
}
