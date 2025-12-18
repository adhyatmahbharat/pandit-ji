import { Stack } from '@mui/material';

// Components
import Hero from 'src/components/_main/home/hero';
import TopBanners from '@/components/_main/home/banners';
import Categories from '@/components/_main/home/categories';
import Vendors from '@/components/_main/home/shops';
import Testimonials from 'src/components/_main/home/testimonials';
import ProductList from '@/components/_main/home/products';
import CollectionWithProducts from '@/components/_main/home/collection-with-products';
import SubscriptionModal from 'src/components/_main/home/subscription';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const revalidate = 60;

export default async function IndexPage() {
  const [homeRes, categoriesRes, bestSellingRes, topRatedRes, featuredRes, vendorsRes, reviewsRes, collectionsRes] =
    await Promise.all([
      fetch(`${baseUrl}/api/getBanner`, { next: { revalidate: 60 } }),
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

  // ✅ FIXED BANNER EXTRACTION
  const homeBanners = banners?.payload?.banners?.homeBanners || [];
  const subBanners = banners?.payload?.banners?.subBanners || [];

  // Collection filters
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
        <Hero data={vendors?.payload?.vendors || []} banners={homeBanners} />

        <TopBanners banners={subBanners} />
      </Stack>

      <Categories data={categories?.data || []} isHome />

      <ProductList
        title="Featured Products"
        description="Discover a curated selection of our most loved products."
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
        description="Explore our best-selling collections."
        path="?top=1"
        data={topRatedProducts?.data || []}
      />

      {godStatueCollections.length > 0 && (
        <CollectionWithProducts
          title="Best Seller God Statue"
          description="Divine god statues crafted with devotion."
          data={godStatueCollections}
        />
      )}

      {hawanItemsCollections.length > 0 && (
        <CollectionWithProducts
          title="Best Seller Hawan Items"
          description="Essential items for sacred rituals."
          data={hawanItemsCollections}
        />
      )}

      {diwaliCollections.length > 0 && (
        <CollectionWithProducts
          title="Diwali Collection"
          description="Celebrate Diwali with divine decor."
          data={diwaliCollections}
        />
      )}

      {Boolean(reviews?.data?.length) && <Testimonials data={reviews.data} />}

      <SubscriptionModal />
    </Stack>
  );
}
