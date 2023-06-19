import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getUserBySessionToken } from '../../database/users';

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

  return (
    <>
      <div>id: {user.id}</div>
      <div>username: {user.username}</div>
    </>
  );
}
