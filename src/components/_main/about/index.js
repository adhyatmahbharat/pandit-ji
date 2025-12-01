'use client';
import React from 'react';
// material ui
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
// images
import AboutImage from 'public/images/abc.avif';
import AboutImage2 from 'public/images/abc1.avif';
// components
import WhyUs from '../home/why-us';

const Data = [
  {
    name: 'Vendors',
    range: '65k+',
    description: 'Contrary to popular belief, Lorem is not simply random text.'
  },
  {
    name: 'Earnings',
    range: '$45B+',
    description: 'Contrary to popular belief, Lorem is not simply random text.'
  },
  {
    name: 'Sold',
    range: '25M+',
    description: 'Contrary to popular belief, Lorem is not simply random text.'
  },
  {
    name: 'Products',
    range: '70k+',
    description: 'Contrary to popular belief, Lorem is not simply random text.'
  }
];

export default function Index() {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ my: 8 }}>
        <Grid container spacing={3}>
          <Grid size={{ md: 6, xs: 12 }}>
            <Stack direction="row" spacing={3} mt={5}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 418,
                  borderRadius: 4,
                  overflow: 'hidden',
                  img: {
                    objectFit: 'cover'
                  }
                }}
              >
                <Image src={AboutImage} alt="" fill placeholder="blur" sizes="(max-width: 600px) 100vw, 50vw" />
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 418,
                  borderRadius: 4,
                  overflow: 'hidden',
                  transform: 'translateY(-40px)',
                  img: {
                    objectFit: 'cover'
                  }
                }}
              >
                <Image src={AboutImage2} alt="" fill placeholder="blur" sizes="(max-width: 600px) 100vw, 50vw" />
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ md: 6, xs: 12 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6" fontSize="16px" textTransform="uppercase" color="primary">
              Who We Are?
            </Typography>
            <Typography variant="h2" fontWeight={800}>
            Creating a World Where Spirituality Meets Everyday Life
            </Typography>
            <Typography variant="body1" fontWeight={400} color="text.secondary" mt={2}>
            At Adhyatmah, we believe spirituality is not just a practice—it’s a way of living. Our mission is to guide individuals on a journey of self-discovery, inner peace, and holistic well-being. Rooted in timeless wisdom yet designed for modern life, Adhyatmah is a space where ancient knowledge meets contemporary understanding.
            Since the beginning of time, humanity has sought answers to life’s deepest questions: Who am I? What is my purpose? How do I find true peace? At Adhyatmah, we strive to bring clarity to these questions through meaningful content, guided practices, and resources that help you connect with your higher self.
            Our platform is dedicated to spreading knowledge about meditation, yoga, mindfulness, spirituality, and inner transformation. Just as the river flows naturally towards the ocean, we help you flow effortlessly towards self-awareness and harmony.
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 5 }}>
          <Typography variant="h3" fontWeight={700} textAlign="center">
            Our Services
          </Typography>
          <Typography
            variant="body1"
            fontWeight={400}
            color="text.secondary"
            sx={{ maxWidth: 350, textAlign: 'center', mx: 'auto' }}
          >
            ✨ Spiritual Guidance – Insights and teachings to deepen your understanding of life and consciousness.
            {/* ✨ Meditation & Mindfulness – Practices to calm the mind, reduce stress, and enhance awareness. */}
            {/* ✨ Holistic Well-being – Connecting body, mind, and soul through balanced living.
            ✨ Community of Seekers – A space to learn, share, and grow together on the path of spirituality. */}
          </Typography>
        </Box>
      </Box>
      {/* WhyUs  */}
      <WhyUs />
      <Box sx={{ marginY: { md: 10, sm: 8, xs: 5 } }}>
        <Grid container spacing={3}>
          {Data.map((item, idx) => (
            <Grid size={{ md: 3, sm: 6, xs: 12 }} key={Math.random()}>
              <Stack
                textAlign="center"
                sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2, p: 2 }}
                key={idx}
              >
                <Typography variant="h3" color="text.secondary">
                  {item.range}
                </Typography>
                <Typography variant="h3" color="text.primary">
                  {item.name}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={400}
                  color="text.secondary"
                  sx={{ maxWidth: 350, textAlign: 'center', mx: 'auto' }}
                >
                  {item.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
