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

export const createEntry = cache(
  async (mealName: string, userId: number, note: string) => {
    const [entry] = await sql<Entry[]>`
    INSERT INTO entries
      (meal_name, user_id, note)
    VALUES
      (${mealName.toLowerCase()}, ${userId}, ${note})
    RETURNING
      id,
      meal_name,
      user_id,
      date_of_meal
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

export const getEntryById = cache(async (entryId: number, userId: number) => {
  const [entryById] = await sql<Entry[]>`
    SELECT
      *
    FROM entries
    WHERE
      id = ${entryId} AND user_id=${userId}
  `;
  return entryById;
});

export const getAllEntries = cache(async () => {
  const entries = await sql<Entry[]>`
    SELECT *
    FROM entries

  `;
  return entries;
});

export const getEntriesByDate = cache(async (userId: number, date: string) => {
  const entries = await sql<Entry[]>`
    SELECT
      *
    FROM
      entries
    WHERE entries.date_of_meal = ${date} AND user_id = ${userId}
  `;

  return entries;
});
