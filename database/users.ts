import { cache } from 'react';
import { User } from '../migrations/1687026201-createUsersTable';
import { sql } from './connect';

type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT * FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
 `;

    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
 `;

  return user;
});

export const getLoggedInUserByUsername = cache(
  async (username: string, sessionToken: string) => {
    const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username,
      sessions.session_token
    FROM
      users
    INNER JOIN
    sessions ON (
      sessions.session_token = ${sessionToken} AND
      users.username = ${username} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
    )
 `;

    return user;
  },
);

export const createUser = cache(
  async (username: string, passwordHash: string) => {
    console.log(passwordHash);
    const [user] = await sql<User[]>`
    INSERT INTO users
      (username, password_hash)
    VALUES
      (${username.toLowerCase()}, ${passwordHash})
    RETURNING
      id,
      username
 `;

    return user;
  },
);

export const getUserBySessionToken = cache(async (sessionToken: string) => {
  const [user] = await sql<User[]>`
  SELECT
    users.id,
    users.username
  FROM
    users
  INNER JOIN
    sessions ON (
      sessions.session_token = ${sessionToken} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
    )
  `;

  return user;
});
