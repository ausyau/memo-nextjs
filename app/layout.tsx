import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Memo",
  description: "Leave a note for a friend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
          <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <a
                href="https://github.com/ausyau"
                target="_blank"
                className="font-bold hover:underline"
                rel="noreferrer"
              >
                Austin Yau.
              </a>{" "}
              All rights reserved.
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}
