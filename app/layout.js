import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';
import ChatWidget from '@/components/ChatWidget';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

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
    locale: 'en_EN',
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


// JSON-LD structured data for better SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Oussama Zribi',
  url: 'https://ohzed.netlify.app',
  sameAs: [
    'https://linkedin.com/in/zroussama',
    'https://github.com/zroussama'
  ],
  jobTitle: 'Software Engineer & Data Architect',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance'
  },
  description: 'Software Engineer & Data Architect specializing in modern web development, data architecture, and cloud solutions.',
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Esprit Tunis',
    sameAs: 'https://www.esprit.tn'
  },
  knowsAbout: [
    'Web Development',
    'Data Architecture',
    'Cloud Computing',
    'Machine Learning',
    'DevOps'
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <Script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-7YM082TMJB`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7YM082TMJB', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans relative bg-primary text-white`}>
        <Header />
        <main>
          {children}
        </main>
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
