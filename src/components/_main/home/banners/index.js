'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Card, Grid, Container, CardActionArea } from '@mui/material';

export default function TopBanners({ banners = [] }) {
  if (!banners.length) return null;

  return (
    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {banners.slice(0, 3).map((banner) => (
            <Grid key={banner.id} size={{ md: 4, xs: 12 }}>
              <Card>
                <CardActionArea component={Link} href={banner.url || '#'}>
                  <Box sx={{ position: 'relative', height: 280, width: '100%' }}>
                    <Image
                      src={banner.url || '/images/placeholder.jpg'}
                      alt={banner.title || 'banner'}
                      fill
                      draggable={false}
                      style={{ objectFit: 'fill' }}
                    />
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
