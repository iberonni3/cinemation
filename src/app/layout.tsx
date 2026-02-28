import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'Cinemation — Motion Design Studio',
  description:
    'We don\'t cut footage. We craft emotion. Cinemation is a premium motion design studio creating brand films, campaigns, and editorial content.',
  openGraph: {
    title: 'Cinemation — Motion Design Studio',
    description: 'We craft emotion through motion.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
