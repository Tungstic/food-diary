import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getEntryById } from '../../../../database/entries';
import { getValidSessionByToken } from '../../../../database/sessions';
import { Entry } from '../../../../migrations/1687438065-createEntriesTable';

type Error = {
  error: string;
};

type EntryResponseBodyGet = { entry: Entry } | Error;

export async function GET(
  request: NextRequest,
  { params }: { params: { entryId: string } },
): Promise<NextResponse<EntryResponseBodyGet>> {
  const entryId = Number(params.entryId);

  if (!entryId) {
    return NextResponse.json(
      { error: 'Entry id is not valid' },
      { status: 400 },
    );
  }

  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  if (!session) {
    return NextResponse.json(
      {
        error: 'session token is not valid',
      },
      { status: 401 },
    );
  }

  const entry = await getEntryById(entryId, session.userId);

  if (!entry) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }

  return NextResponse.json({ entry: entry });
}
