import { NextRequest, NextResponse } from 'next/server';
import { createSymptom } from '../../../database/symptoms';
import { Symptom } from '../../../migrations/1687171306-createSymptomsTable';

type Error = {
  error: string;
};

export type CreateSymptomPost =
  | {
      symptom: Symptom;
    }
  | Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateSymptomPost>> {
  const body = await request.json();

  console.log('my body from api', body);

  const newSymptom = await createSymptom(body.symptomName, body.userId);

  console.log('my new symptom', newSymptom);

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
        symptomName: newSymptom.symptomName,
        userId: newSymptom.userId,
      },
    },
    { status: 200 },
  );
}
