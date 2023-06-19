import { Sql } from 'postgres';

export type Symptom = {
  id: number;
  symptomName: string;
  userId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE symptoms (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      symptom_name varchar (50) NOT NULL UNIQUE,
      user_id integer NOT NULL REFERENCES users (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE symptoms
  `;
}
