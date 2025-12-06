import { Stack } from '@mui/material';

// Components
import Hero from 'src/components/_main/home/hero';
import TopBanners from '@/components/_main/home/banners';
import Categories from '@/components/_main/home/categories';
import Vendors from '@/components/_main/home/shops';
import Testimonials from 'src/components/_main/home/testimonials';
import ProductList from '@/components/_main/home/products';
import Collections from '@/components/_main/home/collections';
import CollectionWithProducts from '@/components/_main/home/collection-with-products';
import SubscriptionModal from 'src/components/_main/home/subscription';
import WhyUs from '@/components/_main/home/why-us';

// API services (direct fetch here or via service layer)
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function IndexPage() {
  // Fetch all home data in parallel
  const [homeRes, categoriesRes, bestSellingRes, topRatedRes, featuredRes, vendorsRes, reviewsRes, collectionsRes] =
    await Promise.all([
      fetch(`${baseUrl}/api/settings/home`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/api/home/categories`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/api/home/products/best-selling`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/api/home/products/top`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/api/home/products/featured`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/api/getAllPandit`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/api/home/reviews?limit=8`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/api/getHomepageCollections?limit=10`, { next: { revalidate: 60 } })
    ]);

  const [banners, categories, bestSellingProducts, topRatedProducts, featuredProducts, vendors, reviews, collections] =
    await Promise.all([
      homeRes.json(),
      categoriesRes.json(),
      bestSellingRes.json(),
      topRatedRes.json(),
      featuredRes.json(),
      vendorsRes.json(),
      reviewsRes.json(),
      collectionsRes.json()
    ]);

  // Filter collections for the specific sections
  const godStatueCollections =
    collections?.payload?.collections?.filter(
      (c) => c.handle === 'eco-friendly' || c.title.toLowerCase().includes('god statue')
    ) || [];

  const hawanItemsCollections =
    collections?.payload?.collections?.filter(
      (c) => c.handle === 'bestseller-of-hawan-items' || c.title.toLowerCase().includes('hawan')
    ) || [];

  const diwaliCollections =
    collections?.payload?.collections?.filter(
      (c) => c.handle === 'diwali' || c.title.toLowerCase().includes('diwali')
    ) || [];

  return (
    <Stack gap={5}>
      <Stack gap={2}>
        <Hero data={vendors?.payload?.vendors || []} banners={banners?.data || []} />
        <TopBanners banners={banners?.data} />
      </Stack>

      <Categories data={categories?.data || []} isHome />
      <ProductList
        title="Featured Products"
        description="Discover a curated selection of our most loved products — handpicked for quality, popularity, and style."
        path="?featured=true"
        data={featuredProducts?.data || []}
      />
      <ProductList
        title="Best Selling Products"
        description="Special products in this month"
        path="?top=1"
        data={bestSellingProducts?.data || []}
      />
      <Vendors data={vendors?.payload?.vendors || []} />
      <ProductList
        title="Top Collection"
        description="Explore our best-selling collections, featuring the latest trends and timeless styles handpicked for every occasion."
        path="?top=1"
        data={topRatedProducts?.data || []}
      />

      {/* New Collection Sections */}
      {godStatueCollections.length > 0 && (
        <CollectionWithProducts
          title="Best Seller God Statue"
          description="Discover our most popular and divine god statues, crafted with devotion and artistic excellence."
          data={godStatueCollections}
        />
      )}

      {hawanItemsCollections.length > 0 && (
        <CollectionWithProducts
          title="Best Seller Hawan Items"
          description="Essential items for your sacred rituals and spiritual practices, chosen by our community."
          data={hawanItemsCollections}
        />
      )}

      {diwaliCollections.length > 0 && (
        <CollectionWithProducts
          title="Diwali Collection"
          description="Celebrate the festival of lights with our special Diwali collection of divine and decorative items."
          data={diwaliCollections}
        />
      )}

      {Boolean(reviews?.data.length) && <Testimonials data={reviews?.data} />}
      <WhyUs />
      <SubscriptionModal />
    </Stack>
  );
}
