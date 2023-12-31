import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  createEntry,
  createEntryWithIngredient,
  createEntryWithSymptom,
  getEntriesByDate,
} from '../../../database/entries';
import {
  getIngredientByEntryId,
  getIngredientByIngredientName,
} from '../../../database/ingredients';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  getSymptomByEntryId,
  getSymptomBySymptomName,
} from '../../../database/symptoms';

type Entry = {
  mealName: string;
  userId: number;
  dateOfMeal: Date;
  note: string | undefined;
};

type Error = {
  error: string;
};

export type CreateEntryPost =
  | {
      entry: Entry;
    }
  | Error;

type EntriesResponseBodyGet = { entries: Entry[] } | Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateEntryPost>> {
  const body = await request.json();

  // check for session token and get user.id from it, not from body of EntryForm
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

  // log here the body from api if necessary

  // check the values with zod (aren't allowed to be undefined or different data types)
  const newEntry = await createEntry(body.mealName, session.userId, body.note);

  // log here "newEntry" if necessary

  if (!newEntry) {
    return NextResponse.json(
      {
        error: 'no entry created',
      },
      { status: 400 },
    );
  }

  // access newEntry.id to save to TABLES entries & ...

  const symptomChoice = body.symptoms;
  for (const symptom of symptomChoice) {
    const symptomId = await getSymptomBySymptomName(symptom);
    console.log('symptomId is', symptomId);

    if (symptomId) {
      const newEntryWithSymptom = await createEntryWithSymptom(
        symptomId.id,
        newEntry.id,
      );
      console.log('newEntryWithSymptom', newEntryWithSymptom);
    }
  }

  const ingredientChoice = body.ingredients;
  for (const ingredient of ingredientChoice) {
    const ingredientId = await getIngredientByIngredientName(ingredient);

    if (ingredientId) {
      await createEntryWithIngredient(ingredientId.id, newEntry.id);
    }
  }

  return NextResponse.json(
    {
      entry: {
        mealName: newEntry.mealName,
        userId: newEntry.userId,
        dateOfMeal: newEntry.dateOfMeal,
        note: newEntry.note,
      },
    },
    { status: 200 },
  );
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<EntriesResponseBodyGet>> {
  const { searchParams } = new URL(request.url);
  // DO NOT USE A BODY which also means there's no request as a parameter in GET()
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

  const requiredDate = searchParams.get('date');
  if (!requiredDate) {
    return NextResponse.json(
      {
        error: 'Date needs to be passed as param',
      },
      { status: 400 },
    );
  }

  const entries = await getEntriesByDate(session.userId, requiredDate);

  let expandedEntry;
  const expandedEntryArray = [];

  for (const entry of entries) {
    const ingredientName = await getIngredientByEntryId(entry.id);
    const symptomName = await getSymptomByEntryId(entry.id);

    // array of objects key: ingredientName, value: string (name)
    const onlyIngredientNames = ingredientName.map((obj) => obj.ingredientName);

    if (symptomName.length > 0) {
      const onlySymptomNames = symptomName.map((obj) => obj.symptomName);
      expandedEntry = { ...entry, onlyIngredientNames, onlySymptomNames };
      expandedEntryArray.push(expandedEntry);
    } else {
      expandedEntry = { ...entry, onlyIngredientNames };
      expandedEntryArray.push(expandedEntry);
    }
  }

  return NextResponse.json({
    entries: expandedEntryArray,
  });
}
