import { NextRequest, NextResponse } from 'next/server';
import { createEntry } from '../../../database/entries';

type Entry = {
  mealName: string;
  userId: number;
  timeOfMeal: Date;
  note: string;
};

type Error = {
  error: string;
};

export type CreateEntryPost =
  | {
      entry: Entry;
    }
  | Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateEntryPost>> {
  const body = await request.json();

  console.log('my body from api', body);

  const newEntry = await createEntry(
    body.mealName,
    body.userId,
    body.timeOfMeal,
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
        timeOfMeal: newEntry.timeOfMeal,
        note: newEntry.note,
      },
    },
    { status: 200 },
  );
}
