import { cache } from 'react';
import { Ingredient } from '../migrations/1687182216-createIngredientsTable';
import { sql } from './connect';

export const createIngredient = cache(
  async (ingredientName: string, userId: number) => {
    const [ingredient] = await sql<Ingredient[]>`
    INSERT INTO ingredients
      (ingredient_name, user_id)
    VALUES
      (${ingredientName.toLowerCase()}, ${userId})
    RETURNING
      id,
      ingredient_name
 `;

    return ingredient;
  },
);

export const getIngredientByIngredientName = cache(
  async (ingredientName: string) => {
    const [ingredient] = await sql<Ingredient[]>`
    SELECT
      id
    FROM
    ingredients
    WHERE
      ingredient_name = ${ingredientName.toLowerCase()}
 `;

    return ingredient;
  },
);

export const getIngredientByEntryId = cache(async (entryId: number) => {
  const [ingredient] = await sql<Ingredient[]>`
    SELECT ingredient_name
    FROM ingredients
    INNER JOIN entries_and_ingredients ON
    ingredients.id = entries_and_ingredients.ingredient_id
    WHERE entry_id = ${entryId}
    `;
  return ingredient;
});

export const getAllIngredients = cache(async () => {
  const allIngredients = await sql<Ingredient[]>`
    SELECT
      ingredients.ingredient_name
    FROM ingredients

  `;
  return allIngredients;
});
