import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import ChatWidget from '@/components/ChatWidget';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Portfolio - Oussama Zribi',
  description: 'Portfolio of Oussama Zribi - Software Architect & Developer',
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
