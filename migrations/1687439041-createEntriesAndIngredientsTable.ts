import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE entries_and_ingredients (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      ingredient_id integer NOT NULL REFERENCES ingredients (id),
      entry_id integer NOT NULL REFERENCES entries (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE entries_and_ingredients
  `;
}
