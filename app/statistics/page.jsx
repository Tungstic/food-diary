import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getSymptomsByUserId,
  getSymptomTable,
  getSymptomWithCount,
} from '../../database/symptoms';
import { getUserBySessionToken } from '../../database/users';

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

  const listOfSymptoms = await getSymptomWithCount(user.id);

  return (
    <>
      <div>Here are the symptoms I have experienced</div>
      {listOfSymptoms.map((symptom) => {
        return (
          <div
            key={`key-${symptom}`}
          >{`${symptom.symptomName}- ${symptom.symptomCount} times`}</div>
        );
      })}
    </>
  );
}
