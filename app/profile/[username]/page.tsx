import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import {
  getLoggedInUserByUsername,
  getUserByUsername,
} from '../../../database/users';

type Props = {
  params: { username: string };
};

export default async function ProfileUsernamePage({ params }: Props) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getLoggedInUserByUsername(params.username, sessionToken.value);

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
