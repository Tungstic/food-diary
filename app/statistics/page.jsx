import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSymptomsWithCount } from '../../database/symptoms';
import { getUserBySessionToken } from '../../database/users';
import styles from './page.module.scss';
import ShowTriggers from './ShowTriggers';

export default async function StatisticsPage() {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    redirect('/login');
  }

  const listOfSymptoms = await getSymptomsWithCount(user.id);

  return (
    <div className={styles.wrapper}>
      <h1>Here are the symptoms you have experienced</h1>
      {listOfSymptoms.map((symptom) => {
        return (
          <div
            key={`key-${symptom.symptomName}`}
            className={styles.singleSymptom}
          >
            {`${symptom.symptomName} - logged ${symptom.symptomCount} times`}
            <ShowTriggers symptom={symptom.symptomName} />
          </div>
        );
      })}
    </div>
  );
}
