import { Sql } from 'postgres';

export type Entry = {
  id: number;
  mealName: string;
  userId: number;
  dateOfMeal: Date;
  note: string | undefined;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE entries (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      meal_name varchar (50) NOT NULL,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      date_of_meal DATE NOT NULL DEFAULT CURRENT_DATE,
      note varchar (200)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE entries
  `;
}
