import "./globals.css";
import 'normalize.css';
import styled from 'styled-jsx/style';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body>{children}</body>
    </html>
  );
}
