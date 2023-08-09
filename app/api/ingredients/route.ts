import { NextRequest, NextResponse } from 'next/server';
import { createIngredient } from '../../../database/ingredients';

type Ingredient = {
  id: number;
  ingredientName: string;
  userId: number;
};

type Error = {
  error: string;
};

export type CreateIngredientPost =
  | {
      ingredient: Ingredient;
    }
  | Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateIngredientPost>> {
  const body = await request.json();

  // log here "body" if necessary

  const newIngredient = await createIngredient(
    body.ingredientName,
    body.userId,
  );

  // log here "newIngredient" if necessary

  if (!newIngredient) {
    return NextResponse.json(
      {
        error: 'no ingredient created',
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      ingredient: {
        id: newIngredient.id,
        ingredientName: newIngredient.ingredientName,
        userId: newIngredient.userId,
      },
    },
    { status: 200 },
  );
}
