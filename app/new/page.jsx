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
    <div style={{ minHeight: '100vh' }}>
      <div style={{ marginLeft: '16px', marginTop: '16px' }}>Welcome back!</div>
      <EntryForm symptoms={symptoms} user={user.id} ingredients={ingredients} />
    </div>
  );
}
