import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSymptomsByUserId } from '../../database/symptoms';
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

  const listOfSymptoms = await getSymptomsByUserId(user.id);

  return (
    <>
      <div>id: {user.id}</div>
      <div>username: {user.username}</div>
      <div>here are the symptoms I created</div>
      {listOfSymptoms.map((symptom) => {
        return <div key={`key-${symptom}`}>{symptom.symptomName}</div>;
      })}
    </>
  );
}
