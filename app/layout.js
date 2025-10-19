import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import ChatWidget from '@/components/ChatWidget';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Portfolio - Oussama Zribi',
  description: 'Portfolio of Oussama Zribi - Software Architect & Developer',
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico', rel: 'shortcut icon' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    title: 'Oussama Zribi',
    statusBarStyle: 'black-translucent',
  },
  manifest: '/favicon/site.webmanifest',
  other: {
    'apple-mobile-web-app-title': 'Oussama Zribi',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative bg-primary text-white`}>
        <Header />
        <main>
          {children}
        </main>
        <ChatWidget />
      </body>
    </html>
  );
}
