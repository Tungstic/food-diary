import { cache } from 'react';
import { Symptom } from '../migrations/1687171306-createSymptomsTable';
import { sql } from './connect';

export const getSymptomBySymptomName = cache(async (symptomName: string) => {
  const [symptom] = await sql<Symptom[]>`
    SELECT
      id
    FROM
      symptoms
    WHERE
      symptom_name = ${symptomName.toLowerCase()}
 `;

  return symptom;
});

export const createSymptom = cache(
  async (symptomName: string, userId: number) => {
    const [symptom] = await sql<Symptom[]>`
    INSERT INTO symptoms
      (symptom_name, user_id)
    VALUES
      (${symptomName.toLowerCase()}, ${userId})
    RETURNING
      id,
      symptom_name
 `;

    return symptom;
  },
);

export const getSymptomsByUserId = cache(async (userId: number) => {
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
    ORDER BY symptom_name;
  `;
  return symptoms;
});

export const getSymptomByEntryId = cache(async (entryId: number) => {
  const symptoms = await sql<Symptom[]>`
    SELECT symptom_name
    FROM symptoms
    INNER JOIN entries_and_symptoms ON
    symptoms.id = entries_and_symptoms.symptom_id
    WHERE entry_id = ${entryId}
    `;
  return symptoms;
});

export const getLoggedSymptomIdByUser = cache(async (userId: number) => {
  const symptoms = await sql<Symptom[]>`
    SELECT symptom_id
    FROM entries_and_symptoms
    INNER JOIN entries ON
    entries.id = entries_and_symptoms.entry_id
    WHERE entries.user_id = ${userId}
  `;
  return symptoms;
});

export const getSymptomsWithCount = cache(async (userId: number) => {
  const symptoms = await sql<Symptom[]>`
    SELECT symptom_name, COUNT(symptom_name) AS symptom_count
    FROM symptoms
    INNER JOIN entries_and_symptoms ON
    symptoms.id=entries_and_symptoms.symptom_id
    INNER JOIN entries ON
    entries.id=entries_and_symptoms.entry_id
    WHERE entries.user_id=${userId}
    GROUP BY symptom_name ORDER BY symptom_count DESC;
  `;
  return symptoms;
});

export const getIngredientsByRelatedSymptom = cache(
  async (userId: number, symptomId: number) => {},
);
/* SELECT ingredient_name, COUNT(ingredient_name) AS ingredient_count
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
 */
