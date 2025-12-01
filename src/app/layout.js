import * as React from 'react';
import Script from 'next/script';
import Providers from 'src/providers';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import 'simplebar-react/dist/simplebar.min.css';

// API services (direct fetch here or via service layer)
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const revalidate = 60; // ISR: Revalidate every 60 seconds
export async function generateMetadata() {
  const res = await fetch(`${baseUrl}/api/settings/main`, {
    next: { revalidate: 60 }
  });

  const { data } = await res.json();

  const seo = data.seo || {};

  return {
    title: seo.metaTitle || data.businessName,
    description: seo.metaDescription || seo.description || '',
    keywords: Array.isArray(seo.tags) ? seo.tags.join(', ') : '',
    icons: {
      icon: data.favicon?.url
    },
    verification: {
      google: 'NMBoUSDDc1vkJrdY6Uthn2qEYUypxtI7WZN25OsttD4'
    },
    openGraph: {
      title: seo.metaTitle || data.businessName || '',
      description: seo.metaDescription || seo.description || '',
      url: data.domainName || '',
      siteName: data.businessName || '',
      type: 'website',
      images: [data.logoLight?.url || data.logoDark?.url || data.favicon?.url]
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle || data.businessName || '',
      description: seo.metaDescription || seo.description || '',
      images: [data.logoLight?.url || data.logoDark?.url || data.favicon?.url]
    }
  };
}

export default async function RootLayout({ children }) {
  const mainRes = await fetch(`${baseUrl}/api/settings/main`, { next: { revalidate: 60 } });
  const brandingRes = await fetch(`${baseUrl}/api/settings/branding`, { next: { revalidate: 60 } });
  const { data: main } = await mainRes.json();
  const { data: branding } = await brandingRes.json();
  return (
    <html lang={'en-US'}>
      <body data-new-gr-c-s-check-loaded="14.1251.0" data-gr-ext-installed="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Google Site Verification - Added via metadata API */}
        
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N6P7DKV0RW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N6P7DKV0RW');
          `}
        </Script>
        
        <GoogleTagManager gtmId={main.gtmId} />
        <GoogleAnalytics gaId={main.gaId} />

        <Providers
          baseCurrency={main.baseCurrency}
          theme={branding.theme}
          cloudName={main.cloudName}
          preset={main.preset}
          shippingFee={main.shippingFee}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
