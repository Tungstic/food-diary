import { cache } from 'react';
import { Symptom } from '../migrations/1687171306-createSymptomsTable';
import { sql } from './connect';

/* type UserWithPasswordHash = User & {
  passwordHash: string;
}; */

export const getSymptomBySymptomName = cache(async (symptomName: string) => {
  const [symptom] = await sql<Symptom[]>`
    SELECT
      id,
      symptom_name
    FROM
      symptoms
    WHERE
      users.username = ${symptomName.toLowerCase()}
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
      symptoms.user_id = ${userId};

  `;
  return symptomsByUserId;
});