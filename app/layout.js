import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import Header from '@/components/Header';
import ChatWidget from '@/components/ChatWidget';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Portfolio - Oussama Zribi',
  description: 'Portfolio of Oussama Zribi - Software Architect & Developer',
  metadataBase: new URL('https://ohzed.netlify.app/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Portfolio - Oussama Zribi',
    description: 'Portfolio of Oussama Zribi - Software Architect & Developer',
    url: 'https://ohzed.netlify.app/',
    siteName: 'Oussama Zribi Portfolio',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Oussama Zribi - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oussama Zribi - Software Architect & Developer',
    description: 'Explore my portfolio and projects',
    creator: '@votretwitter',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
    <html lang="fr">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        
        {/* Hotjar Tracking Code */}
        <Script
          id="hotjar"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:0000000,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} relative bg-primary text-white`}>
        <Header />
        <main>
          {children}
        </main>
        <ChatWidget />
        <Analytics />
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
