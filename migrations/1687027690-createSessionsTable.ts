import { Sql } from 'postgres';

export type Session = {
  id: number;
  sessionToken: string;
  userId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE sessions (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      session_token varchar (250) NOT NULL UNIQUE,
      expiry_timestamp timestamp NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE sessions
  `;
}
