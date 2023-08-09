import { NextRequest, NextResponse } from 'next/server';
import { createSymptom } from '../../../database/symptoms';

type SymptomFromDB = {
  id: number;
  symptomName: string;
  userId: number;
};

type Error = {
  error: string;
};

export type CreateSymptomPost =
  | {
      symptom: SymptomFromDB;
    }
  | Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateSymptomPost>> {
  const body = await request.json();

  // log here "body" if necessary

  const newSymptom = await createSymptom(body.symptomName, body.userId);

  // log here "newSymptom" if necessary

  if (!newSymptom) {
    return NextResponse.json(
      {
        error: 'no symptom created',
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      symptom: {
        id: newSymptom.id,
        symptomName: newSymptom.symptomName,
        userId: newSymptom.userId,
      },
    },
    { status: 200 },
  );
}
