import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getIngredientsByRelatedSymptom } from '../../../../database/ingredients';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getSymptomBySymptomName } from '../../../../database/symptoms';

type Error = {
  error: string;
};

type Ingredient = {
  ingredientName: string;
  ingredientCount: number;
};

type SymptomTriggersResponseBodyGet =
  | {
      ingredient: Ingredient[];
    }
  | Error;

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string> },
): Promise<NextResponse<SymptomTriggersResponseBodyGet>> {
  const symptomName = params.symptomName;

  if (!symptomName) {
    return NextResponse.json(
      {
        error: 'Symptom name is not valid',
      },
      { status: 400 },
    );
  }

  const symptomId = await getSymptomBySymptomName(symptomName);

  if (!symptomId) {
    return NextResponse.json(
      {
        error: 'Symptom Not Found',
      },
      { status: 404 },
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

  const relatedIngredients = await getIngredientsByRelatedSymptom(
    session.userId,
    symptomId.id,
  );

  return NextResponse.json({
    ingredients: relatedIngredients,
  });
}
