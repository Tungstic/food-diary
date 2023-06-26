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

  console.log('my body from api', body);

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
  const body = await request.json();

  console.log('my GET body from api entries', body);

  const allEntries = await getAllEntries();

  console.log(allEntries);
  // why does Postman get 500 error?
  // why does allEntries have to be a value of key "entries"? where does that key come from?
  return NextResponse.json({ entries: allEntries });
}
