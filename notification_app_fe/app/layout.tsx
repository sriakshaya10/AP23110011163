import './globals.css';

export const metadata = {
  title: 'Notifications App',
  description: 'A responsive notifications application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
