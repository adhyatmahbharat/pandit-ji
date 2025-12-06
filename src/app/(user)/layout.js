import React from 'react';

// mui
import { Toolbar } from '@mui/material';

// components
import Navbar from 'src/layout/_main/navbar';
import Footer from '@/layout/_main/footer';
import ActionBar from 'src/layout/_main/actionbar';

// Meta information
export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    if (!baseUrl)
      return {
        title: 'adhyatmah ',
        description:
          'Log in to adhyatmah for secure access to your account. Enjoy seamless shopping, personalized experiences, and hassle-free transactions. Your trusted portal to a world of convenience awaits. Login now!',
        applicationName: 'adhyatmah',
        authors: 'adhyatmah',
        keywords: 'ecommerce, adhyatmah, Commerce, Sign in adhyatmah, Signin From adhyatmah',
        icons: {
          icon: 'https://adhyatmah.vercel.app/favicon.png'
        },
        openGraph: {
          images: 'https://adhyatmah.vercel.app/opengraph-image.png?1c6a1fa20db2840f'
        }
      };

    const res = await fetch(`${baseUrl}/api/settings/main`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('failed to fetch settings');
    const { data } = await res.json();

    return {
      title: 'adhyatmah ',
      description:
        'Log in to adhyatmah for secure access to your account. Enjoy seamless shopping, personalized experiences, and hassle-free transactions. Your trusted portal to a world of convenience awaits. Login now!',
      applicationName: 'adhyatmah',
      authors: 'adhyatmah',
      keywords: 'ecommerce, adhyatmah, Commerce, Sign in adhyatmah, Signin From adhyatmah',
      icons: {
        icon: data.favicon?.url || 'https://adhyatmah.vercel.app/favicon.png'
      },
      openGraph: {
        images:
          data.logoLight?.url ||
          data.logoDark?.url ||
          'https://adhyatmah.vercel.app/opengraph-image.png?1c6a1fa20db2840f'
      }
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('generateMetadata: failed to fetch main settings', err);
    return {
      title: 'adhyatmah ',
      description:
        'Log in to adhyatmah for secure access to your account. Enjoy seamless shopping, personalized experiences, and hassle-free transactions. Your trusted portal to a world of convenience awaits. Login now!',
      applicationName: 'adhyatmah',
      authors: 'adhyatmah',
      keywords: 'ecommerce, adhyatmah, Commerce, Sign in adhyatmah, Signin From adhyatmah',
      icons: {
        icon: 'https://adhyatmah.vercel.app/favicon.png'
      },
      openGraph: {
        images: 'https://adhyatmah.vercel.app/opengraph-image.png?1c6a1fa20db2840f'
      }
    };
  }
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function RootLayout({ children }) {
  try {
    let branding = null;
    let categories = [];
    if (baseUrl) {
      try {
        const res = await fetch(`${baseUrl}/api/settings/branding`, { next: { revalidate: 60 } });
        if (res.ok) {
          const json = await res.json();
          branding = json?.data || null;
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('RootLayout: failed to fetch branding', err);
        branding = null;
      }

      try {
        const res2 = await fetch(`${baseUrl}/api/all-categories`, { next: { revalidate: 60 } });
        if (res2.ok) {
          const json2 = await res2.json();
          categories = json2?.data || [];
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('RootLayout: failed to fetch categories', err);
        categories = [];
      }
    }

    return (
      <>
        <Navbar branding={branding} />
        <ActionBar categories={categories} />
        {children}
        <Toolbar sx={{ display: { xs: 'block', md: 'none' } }} />
        <Footer branding={branding} />
      </>
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('RootLayout: unexpected error', err);
    return (
      <>
        <Navbar branding={null} />
        <ActionBar categories={[]} />
        {children}
        <Toolbar sx={{ display: { xs: 'block', md: 'none' } }} />
        <Footer branding={null} />
      </>
    );
  }
}
