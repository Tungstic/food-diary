import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE entries_and_symptoms (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      symptom_id integer NOT NULL REFERENCES symptoms (id),
      entry_id integer NOT NULL REFERENCES entries (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE entries_and_symptoms
  `;
}
