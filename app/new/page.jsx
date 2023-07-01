import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllIngredients } from '../../database/ingredients';
import { getAllSymptoms } from '../../database/symptoms';
import { getUserBySessionToken } from '../../database/users';
import EntryForm from './EntryForm';

export default async function NewEntryPage() {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    redirect('/login');
  }

  const symptoms = await getAllSymptoms();
  const ingredients = await getAllIngredients();

  return (
    <>
      <div style={{ marginLeft: '16px' }}>{`Welcome back, ${user.username
        .at(0)
        ?.toUpperCase()}${user.username.slice(1)}`}</div>
      <EntryForm symptoms={symptoms} user={user.id} ingredients={ingredients} />
    </>
  );
}
