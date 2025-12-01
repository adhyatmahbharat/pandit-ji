import React from 'react';
// components
import SingleSlideCarousel from '@/components/carousels/single-slide';
// mui
import { Stack, Container } from '@mui/material';

export default function Hero({ data, banners }) {
  return (
    <Container maxWidth="xl">
      <Stack gap={2} mt={2}>
        <SingleSlideCarousel data={banners?.slides} />
      </Stack>
    </Container>
  );
}
