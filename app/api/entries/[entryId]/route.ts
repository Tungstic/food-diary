import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getEntryById } from '../../../../database/entries';
import { getIngredientByEntryId } from '../../../../database/ingredients';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getSymptomByEntryId } from '../../../../database/symptoms';
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
  console.log('entry number', entryId);

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

  let expandedEntry;

  const ingredientName = await getIngredientByEntryId(entry.id);
  const symptomName = await getSymptomByEntryId(entry.id);
  const onlyIngredientNames = ingredientName.map((obj) => obj.ingredientName);

  if (symptomName.length > 0) {
    const onlySymptomNames = symptomName.map((obj) => obj.symptomName);
    expandedEntry = { ...entry, onlyIngredientNames, onlySymptomNames };
  } else {
    expandedEntry = { ...entry, onlyIngredientNames };
  }

  return NextResponse.json({ entry: expandedEntry });
}
