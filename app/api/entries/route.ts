import { NextRequest, NextResponse } from 'next/server';
import { createEntry, getAllEntries } from '../../../database/entries';

type Entry = {
  mealName: string;
  userId: number;
  dateOfMeal: Date;
  note: string | undefined;
};

type EntryFromDB = {
  id: number;
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

type EntriesResponseBodyGet = { entries: EntryFromDB[] | Error };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateEntryPost>> {
  const body = await request.json();

  // check for session token and get user.id from it, not from body of EntryForm

  console.log('my body from api', body);

  // check the values with zod (aren't allowed to be undefined or different data types)
  const newEntry = await createEntry(
    body.mealName,
    body.userId,
    body.dateOfMeal,
    body.note,
  );

  console.log('my new entry', newEntry);

  if (!newEntry) {
    return NextResponse.json(
      {
        error: 'no entry created',
      },
      { status: 400 },
    );
  }

  // access newEntry.id to save to TABLES entries & ...

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

export async function GET(): Promise<NextResponse<EntriesResponseBodyGet>> {
  // DO NOT USE A BODY which also means there's no request as a parameter in GET()
  const allEntries = await getAllEntries();

  console.log(allEntries);

  return NextResponse.json({ entries: allEntries });
}
