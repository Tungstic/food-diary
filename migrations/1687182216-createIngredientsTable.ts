import { Sql } from 'postgres';

export type Ingredient = {
  id: number;
  ingredientName: string;
  userId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE ingredients (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      ingredient_name varchar (50) NOT NULL UNIQUE,
      user_id integer NOT NULL REFERENCES users (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE ingredients
  `;
}
