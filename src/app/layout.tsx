import "./globals.css";
import Head from 'next/head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>TripTalkies</title>
      </Head>
      <body>{children}</body>
    </html>
  );
}
