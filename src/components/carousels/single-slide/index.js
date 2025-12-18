'use client';

import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { Box, Card, Stack, Typography, LinearProgress } from '@mui/material';

const AUTOPLAY_DELAY = 5000;

function CarouselItem({ item }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 125, sm: 225, md: 350, lg: 400 },
        display: 'block'
      }}
      component={item.url ? Link : 'div'}
      href={item.url || undefined}
    >
      <Image
        priority
        src={item.url || '/images/placeholder.jpg'}
        alt={item.title || 'banner'}
        fill
        draggable={false}
        style={{ objectFit: 'fill' }}
      />
    </Box>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    url: PropTypes.string.isRequired
  }).isRequired
};

export default function SingleSlideCarousel({ data = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false })
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const isEmpty = !data.length;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setProgress(0);
    emblaApi.plugins()?.autoplay?.reset();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    let raf;
    const start = Date.now();

    const animate = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / AUTOPLAY_DELAY) * 100, 100));
      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [selectedIndex]);

  return (
    <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
      {isEmpty ? (
        <Stack alignItems="center" justifyContent="center" height={200}>
          <Typography color="text.secondary">No banners found</Typography>
        </Stack>
      ) : (
        <>
          <Box ref={emblaRef} sx={{ overflow: 'hidden', objectFit: 'contain' }}>
            <Box sx={{ display: 'flex' }}>
              {data.map((item) => (
                <Box key={item.id} sx={{ flex: '0 0 100%' }}>
                  <CarouselItem item={item} />
                </Box>
              ))}
            </Box>
          </Box>

          <LinearProgress variant="determinate" value={progress} sx={{ height: 4 }} />
        </>
      )}
    </Card>
  );
}

SingleSlideCarousel.propTypes = {
  data: PropTypes.array.isRequired
};
