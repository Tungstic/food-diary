/* import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getTodaysEntries } from '../../../../database/entries';
import { getValidSessionByToken } from '../../../../database/sessions';
import { Entry } from '../../../../migrations/1687438065-createEntriesTable';

type Error = {
  error: string;
};

type EntriesResponseBodyGet = { entries: Entry[] } | Error;

export async function GET(
  request: NextRequest,
): Promise<NextResponse<EntriesResponseBodyGet>> {
  const { searchParams } = new URL(request.url);

  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  console.log('This comes from the API', session);

  if (!session) {
    return NextResponse.json(
      {
        error: 'session token is not valid',
      },
      { status: 401 },
    );
  }

  // determine my search param and pass it into the DB fn
  // re-write that DB fn or write a new one that accepts date as a parameter
  const entries = await getTodaysEntries(session.userId);

  return NextResponse.json({ entries: entries });
}
 */
