import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Food Diary',
  description: 'Log your meals and symptoms to detect your food triggers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/new">New entry</Link>
            <Link href="/statistics">Statistics</Link>
            <Link href="/profile">My profile</Link>
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
