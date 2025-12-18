'use client';
import React from 'react';
import Link from 'next/link';

import { Box, Container, Grid, Stack, Typography, TextField, Button, Divider, IconButton } from '@mui/material';

import {
  FaTruck,
  FaHeadset,
  FaTags,
  FaShieldAlt,
  FaExchangeAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa';

import { MdOutlineLocationOn, MdOutlineCall } from 'react-icons/md';
import { FiMail } from 'react-icons/fi';

const FEATURES = [
  { icon: <FaTruck />, title: 'Free Shipping', desc: 'On all orders' },
  { icon: <FaHeadset />, title: '24/7 Support', desc: 'Dedicated support' },
  { icon: <FaTags />, title: 'Big Savings', desc: 'Best prices' },
  { icon: <FaShieldAlt />, title: 'Secure Payment', desc: '100% secure' },
  { icon: <FaExchangeAlt />, title: 'Exchange Offer', desc: 'Easy exchange' }
];

export default function Footer({ branding }) {
  // Safe access to branding data with fallbacks
  const address = branding?.contact?.address || 'Address not available';
  const phone = branding?.contact?.whatsappNo || 'Phone not available';
  const email = branding?.contact?.email || 'Email not available';

  return (
    <Box mt={8}>
      {/* Newsletter Section */}
      <Container maxWidth="xl">
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          py={4}
          px={3}
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        >
          <Grid item xs={12} md="auto" mb={{ xs: 2, md: 0 }}>
            <Typography variant="h6" fontWeight={600}>
              🔔 Sign Up For Newsletter
            </Typography>
          </Grid>

          <Grid item xs={12} md="auto">
            <Stack direction="row" spacing={2} alignItems="center" width="100%">
              <TextField
                placeholder="Enter your email"
                size="small"
                fullWidth
                sx={{
                  bgcolor: '#fff',
                  maxWidth: { xs: '100%', sm: 320 },
                  borderRadius: 1
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#ff9800',
                  '&:hover': { bgcolor: '#fb8c00' },
                  whiteSpace: 'nowrap'
                }}
              >
                Subscribe
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="xl">
        <Grid container spacing={3} justifyContent="space-evenly" py={4} px={3} textAlign="center">
          {FEATURES.map((item, i) => (
            <Grid item xs={6} sm={4} md={2} key={i}>
              <Stack spacing={1} alignItems="center">
                <Box fontSize={40} color="#ff9800">
                  {item.icon}
                </Box>
                <Typography fontWeight={600} fontSize={15}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={13}>
                  {item.desc}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider sx={{ my: 4 }} />

      {/* Main Footer Links */}
      <Container maxWidth="xl">
        <Grid container spacing={4} py={4} px={3} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3} lg={2.5}>
            <Typography color="text.primary" fontWeight={600} mb={2} fontSize={16}>
              Resources
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              <Typography
                color="#6b7280"
                variant="body2"
                component={Link}
                href="/contact"
                sx={{
                  fontSize: '14px',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#f97316' }
                }}
              >
                Contact Us
              </Typography>
              <Typography
                color="#6b7280"
                variant="body2"
                component={Link}
                href="/products"
                sx={{
                  fontSize: '14px',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#f97316' }
                }}
              >
                Products
              </Typography>
              <Typography
                color="#6b7280"
                variant="body2"
                component={Link}
                href="/shops"
                sx={{
                  fontSize: '14px',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#f97316' }
                }}
              >
                Pandits
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={2.5}>
            <Typography fontWeight={600} mb={2} fontSize={16}>
              Help
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              <Typography
                color="#6b7280"
                variant="body2"
                component={Link}
                href="/privacy-policy"
                sx={{
                  fontSize: '14px',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#f97316' }
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                color="#6b7280"
                variant="body2"
                component={Link}
                href="/terms-and-conditions"
                sx={{
                  fontSize: '14px',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#f97316' }
                }}
              >
                Terms & Conditions
              </Typography>
              <Typography
                color="#6b7280"
                variant="body2"
                component={Link}
                href="/refund-return-policy"
                sx={{
                  fontSize: '14px',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#f97316' }
                }}
              >
                Refund Policy
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={2.5}>
            <Typography fontWeight={700} mb={2} fontSize={16}>
              My Account
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              <Typography
                color="#6b7280"
                variant="body2"
                component={Link}
                href="/login"
                sx={{
                  fontSize: '14px',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#f97316' }
                }}
              >
                Login
              </Typography>
              <Typography
                color="#6b7280"
                variant="body2"
                component={Link}
                href="/register"
                sx={{
                  fontSize: '14px',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#f97316' }
                }}
              >
                Register
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={4}>
            <Typography fontWeight={600} mb={2} fontSize={16}>
              Contact Information
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <MdOutlineLocationOn style={{ marginTop: 2, flexShrink: 0, fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontSize: '14px', color: '#6b7280' }}>
                  {address}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <MdOutlineCall style={{ flexShrink: 0, fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontSize: '14px', color: '#6b7280' }}>
                  {phone}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <FiMail style={{ flexShrink: 0, fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontSize: '14px', color: '#6b7280' }}>
                  {email}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      {/* Bottom Bar */}
      <Container maxWidth="xl">
        <Grid container alignItems="center" justifyContent="space-between" py={3} px={3}>
          <Typography variant="body2" color="text.secondary">
            © 2025 Adhyatmah. All rights reserved
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton size="small" sx={{ '&:hover': { color: '#ff9800' } }}>
              <FaFacebookF />
            </IconButton>
            <IconButton size="small" sx={{ '&:hover': { color: '#ff9800' } }}>
              <FaInstagram />
            </IconButton>
            <IconButton size="small" sx={{ '&:hover': { color: '#ff9800' } }}>
              <FaLinkedinIn />
            </IconButton>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}
