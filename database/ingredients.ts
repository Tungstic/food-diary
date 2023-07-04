import { cache } from 'react';
import { Ingredient } from '../migrations/1687182216-createIngredientsTable';
import { sql } from './connect';

type IngredientCounted = {
  ingredientName: string;
  ingredientCount: number;
};

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
  const ingredients = await sql<Ingredient[]>`
    SELECT ingredient_name
    FROM ingredients
    INNER JOIN entries_and_ingredients ON
    ingredients.id = entries_and_ingredients.ingredient_id
    WHERE entry_id = ${entryId}
    `;
  return ingredients;
});

export const getAllIngredients = cache(async () => {
  const allIngredients = await sql<Ingredient[]>`
    SELECT
      ingredients.ingredient_name
    FROM ingredients
    ORDER BY ingredient_name;
  `;
  return allIngredients;
});

export const getIngredientsByRelatedSymptom = cache(
  async (userId: number, symptomId: number) => {
    const ingredients = await sql<IngredientCounted[]>`
    SELECT ingredient_name, COUNT(ingredient_name) AS ingredient_count
    FROM ingredients
    INNER JOIN entries_and_ingredients ON
    ingredients.id=entries_and_ingredients.ingredient_id
    INNER JOIN entries ON
    entries.id=entries_and_ingredients.entry_id
    INNER JOIN entries_and_symptoms ON
    entries.id=entries_and_symptoms.entry_id AND
    entries_and_symptoms.symptom_id=${symptomId}
    WHERE entries.user_id=${userId}
    GROUP BY ingredient_name ORDER BY ingredient_count DESC;
  `;
    return ingredients;
  },
);
