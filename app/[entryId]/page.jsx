import { cookies } from 'next/headers';
import { getUserBySessionToken } from '../../database/users';
import ShowEntry from './ShowEntry';

export default async function SingleEntry(props) {
  const entryId = props.params.entryId;

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    return <div>Please log in</div>;
  }

  return <ShowEntry entryId={entryId} />;
}
