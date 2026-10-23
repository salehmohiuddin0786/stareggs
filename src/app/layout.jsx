import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import ScrollProgress from '@/components/motion/ScrollProgress';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'STAR EGGS — Commercial Egg Wholesale, Retail & Distribution in Telangana',
    template: '%s | STAR EGGS',
  },
  description:
    'Premier egg wholesale and distribution network across Hyderabad and Telangana. Supplying fresh white and brown eggs in 30-egg trays and 210-egg cartons to distributors, supermarkets, hotels, and retail shops.',
  keywords: [
    'egg wholesale hyderabad',
    'egg distribution telangana',
    'bulk egg supply hyderabad',
    'egg supplier telangana',
    'wholesale egg tray price',
    'poultry distribution hyderabad',
    'star eggs telangana',
  ],
  authors: [{ name: 'Star Eggs Commercial Operations Desk' }],
  creator: 'Star Eggs',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://stareggs.in',
    title: 'STAR EGGS — Fresh Eggs. Reliable Supply. Telangana-Wide.',
    description:
      'Commercial egg wholesale, retail supply, and expanding distribution network across all districts of Telangana.',
    siteName: 'STAR EGGS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STAR EGGS — Commercial Egg Wholesale & Distribution',
    description: 'Reliable egg supply for distributors, retailers, supermarkets, and hotels across Telangana.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WholesaleStore',
    name: 'STAR EGGS',
    image: 'https://stareggs.in/images/products/egg-tray.svg',
    description: 'Commercial wholesale, retail, and regional egg distribution network across Telangana.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Commercial Complex, Market Road, Near Old Bus Stand',
      addressLocality: 'Adilabad',
      addressRegion: 'Telangana',
      postalCode: '504001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '19.6641',
      longitude: '78.5320',
    },
    url: 'https://stareggs.in',
    hasMap: process.env.NEXT_PUBLIC_GOOGLE_MAPS_LINK || 'https://maps.app.goo.gl/BzzxbCL7VV8kjbS26',
    telephone: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 98765 43210',
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '05:00',
        closes: '20:00',
      },
    ],
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-brand-navy text-white min-h-screen flex flex-col antialiased">
        <ScrollProgress />
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
