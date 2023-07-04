import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSymptomsWithCount } from '../../database/symptoms';
import { getUserBySessionToken } from '../../database/users';
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
    <>
      <div>Here are the symptoms I have experienced</div>
      {listOfSymptoms.map((symptom) => {
        return (
          <div key={`key-${symptom.symptomName}`}>
            {`${symptom.symptomName}- ${symptom.symptomCount} times`}
            <ShowTriggers symptom={symptom.symptomName} />
          </div>
        );
      })}
    </>
  );
}
