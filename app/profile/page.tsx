import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CreatableSelect from 'react-select/creatable';
import { getAllIngredients } from '../../database/ingredients';
import { getAllSymptoms } from '../../database/symptoms';
import { getUserBySessionToken } from '../../database/users';
import InputForm from './InputForm';

export default async function ProfileUsernamePage() {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    notFound();
  }

  const symptoms = await getAllSymptoms();
  const ingredients = await getAllIngredients();

  return (
    <>
      <div>{`Hello, ${user.username.at(0)?.toUpperCase()}${user.username.slice(
        1,
      )}`}</div>
      <div>
        This is your profile. Here you can see the full list of symptoms and
        ingredients and add to it. You can also create new symptoms and/or
        ingredients while making{' '}
        <Link style={{ textDecoration: 'none', color: 'red' }} href="/new">
          a new entry
        </Link>
      </div>

      <InputForm symptoms={symptoms} user={user.id} ingredients={ingredients} />
    </>
  );
}
