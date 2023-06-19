import { Sql } from 'postgres';

const predefinedSymptoms = [
  'Nausea',
  'Vomiting',
  'Diarrhea',
  'Stomach pain',
  'Headache',
  'Bloating',
  'Constipation',
  'Heartburn',
  'Gas',
];

export async function up(sql: Sql) {
  for (const symptom of predefinedSymptoms) {
    await sql`
    INSERT INTO symptoms
    (symptom_name, user_id)
    VALUES
    (${symptom.toLowerCase()}, ${4})

  `;
  }
}

export async function down(sql: Sql) {
  for (const symptom of predefinedSymptoms) {
    await sql`
    DELETE FROM symptoms WHERE symptom_name = ${symptom}
  `;
  }
}
