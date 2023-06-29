import { cache } from 'react';
import { Session } from '../migrations/1687027690-createSessionsTable';
import { sql } from './connect';

export const deleteExpiredSessions = cache(async () => {
  await sql`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < now()
  `;
});

export const createSession = cache(
  async (sessionToken: string, userId: number) => {
    const [session] = await sql<Session[]>`
    INSERT INTO sessions
      (session_token, user_id)
    VALUES
      (${sessionToken}, ${userId})
    RETURNING
      id,
      session_token,
      user_id
  `;

    // delete all sessions that are expired
    await deleteExpiredSessions();

    return session;
  },
);

export const deleteSessionByToken = cache(async (sessionToken: string) => {
  const [session] = await sql<{ id: number; sessionToken: string }[]>`
    DELETE FROM
      sessions
    WHERE
      sessions.session_token = ${sessionToken}
    RETURNING
      id,
      session_token
  `;

  return session;
});

export const getValidSessionByToken = cache(async (sessionToken: string) => {
  // Get the session if match the token AND is not expired
  const [session] = await sql<{ id: number; sessionToken: string }[]>`
    SELECT
      sessions.id,
      sessions.session_token,
      sessions.user_id
    FROM
      sessions
    WHERE
      sessions.session_token = ${sessionToken}
    AND
      sessions.expiry_timestamp > now()
  `;

  return session;
});
