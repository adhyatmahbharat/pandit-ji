import { Stack } from '@mui/material';

// Components
import Hero from 'src/components/_main/home/hero';
import TopBanners from '@/components/_main/home/banners';
import CategoriesWithProducts from '@/components/_main/home/categories-with-products';
import Vendors from '@/components/_main/home/shops';
import Testimonials from 'src/components/_main/home/testimonials';
import SubscriptionModal from 'src/components/_main/home/subscription';
import WhyUs from '@/components/_main/home/why-us';
import Categories from '@/components/_main/home/categories';

// API services
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function IndexPage() {
  // Single API call to get all homepage data
  const response = await fetch(`${baseUrl}/api/home/unified`, {
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch homepage data');
  }

  const { data } = await response.json();
  const { banners, categories, vendors, reviews } = data;
  const categoriesList = await fetch(`${baseUrl}/api/home/categories`, { next: { revalidate: 60 } });
  if (!categoriesList.ok) {
    throw new Error('Failed to fetch categories data');
  }
  const categoriesListJson = await categoriesList.json();

  return (
    <Stack gap={5}>
      <Stack gap={2}>
        <Hero data={vendors || []} banners={banners || {}} />
        <TopBanners banners={banners} />
      </Stack>
      <Categories data={categoriesListJson?.data || []} isHome />
      <Vendors data={vendors || []} />
      <CategoriesWithProducts data={categories || []} isHome />

      {Boolean(reviews?.length) && <Testimonials data={reviews} />}
      <WhyUs />
      <SubscriptionModal />
    </Stack>
  );
}
