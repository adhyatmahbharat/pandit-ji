import React from 'react';
import SingleSlideCarousel from '@/components/carousels/single-slide';
import { Stack, Container } from '@mui/material';

export default function Hero({ data, banners }) {
  return (
    <Container maxWidth="xl">
      <Stack gap={2} mt={2}>
        <SingleSlideCarousel data={banners || []} />
      </Stack>
    </Container>
  );
}
