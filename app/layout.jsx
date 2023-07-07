import './globals.css';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import { logout } from './(auth)/logout/actions';
import { LogoutButton } from './(auth)/logout/LogoutButton';

export const metadata = {
  title: 'Food Diary',
  description: 'Identify your food triggers and allergies',
};

export default async function RootLayout({ children }) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en">
      <body style={{ overflow: 'scroll' }}>
        <header>
          <nav>
            {user ? (
              <>
                <div className="pages">
                  <Link href="/">Home</Link>
                  <Link href="/new">New entry</Link>
                  <Link href="/statistics">Statistics</Link>
                  <Link href="/profile">My profile</Link>
                </div>
                <div className="auth">
                  <div>
                    {user.username.at(0)?.toUpperCase() +
                      user.username.slice(1)}
                  </div>
                  <LogoutButton logout={logout} />
                </div>
              </>
            ) : (
              <>
                <div className="pages">
                  <Link href="/">Home</Link>
                </div>
                <div className="auth">
                  <Link href="/register">Register</Link>
                  <Link href="/login">Log in</Link>
                </div>
              </>
            )}
          </nav>
        </header>
        {children}
        <footer>
          <div>Made by NB ©2023</div>
          <div>
            Disclaimer: this app does not provide any medical or dietary advice.
            Always consult a licensed health professional prior to modifying
            your diet.
          </div>
        </footer>
      </body>
    </html>
  );
}
