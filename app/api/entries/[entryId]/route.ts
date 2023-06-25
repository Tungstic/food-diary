/* import { NextRequest, NextResponse } from 'next/server';
import { getEntryById } from '../../../../database/entries';
import { Entry } from '../../../../migrations/1687438065-createEntriesTable';

type Error = {
  error: string;
};
type EntryResponseBodyGet = Entry | Error | undefined;

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<EntryResponseBodyGet>> {
  if (!entryId) {
    return NextResponse.json(
      {
        error: 'entry id is not valid',
      },
      { status: 400 },
    );
  }

  const entry = await getEntryById(entryId);

  return NextResponse.json(entry);
}
 */
