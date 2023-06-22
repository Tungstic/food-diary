import { cache } from 'react';
import { Entry } from '../migrations/1687438065-createEntriesTable';
import { sql } from './connect';

type EntryWithSymptom = {
  symptomId: number;
  entryId: number;
};

type EntryWithIngredient = {
  ingredientId: number;
  entryId: number;
};

/* export const getSymptomBySymptomName = cache(async (symptomName: string) => {
  const [symptom] = await sql<Symptom[]>`
    SELECT
      id,
      symptom_name
    FROM
      symptoms
    WHERE
      symptoms.symptom_name = ${symptomName.toLowerCase()}
 `;

  return symptom;
}); */

export const createEntry = cache(
  async (mealName: string, userId: number, timeOfMeal: Date, note: string) => {
    const [entry] = await sql<Entry[]>`
    INSERT INTO entries
      (meal_name, user_id, time_of_meal, note)
    VALUES
      (${mealName.toLowerCase()}, ${userId}, ${timeOfMeal}, ${note})
    RETURNING
      id,
      meal_name,
      user_id,
      time_of_meal
 `;
    return entry;
  },
);

export const createEntryWithSymptom = cache(
  async (symptomId: number, entryId: number) => {
    const [entryWithSymptom] = await sql<EntryWithSymptom[]>`
    INSERT INTO entries_and_symptoms
      (symptom_id, entry_id)
    VALUES
      (${symptomId}, ${entryId})
    RETURNING
      id,
      symptom_id,
      entry_id
 `;
    return entryWithSymptom;
  },
);

export const createEntryWithIngredient = cache(
  async (ingredientId: number, entryId: number) => {
    const [entryWithIngredient] = await sql<EntryWithIngredient[]>`
    INSERT INTO entries_and_ingredients
      (ingredient_id, entry_id)
    VALUES
      (${ingredientId}, ${entryId})
    RETURNING
      id,
      ingredient_id,
      entry_id
 `;
    return entryWithIngredient;
  },
);

/* export const getSymptomsByUserId = cache(async (userId: number) => {
  const symptomsByUserId = await sql<Symptom[]>`
    SELECT
      symptoms.symptom_name
    FROM symptoms
    WHERE
      symptoms.user_id = ${userId}

  `;
  return symptomsByUserId;
});

export const getAllSymptoms = cache(async () => {
  const symptoms = await sql<Symptom[]>`
    SELECT *
    FROM symptoms
  `;
  return symptoms;
});
 */
