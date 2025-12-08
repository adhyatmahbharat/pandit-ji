'use client';

import { Box, Container, Typography, Button, Card, CardContent, Stack, Grid, Chip } from '@mui/material';
import { IoCheckmarkCircle, IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

export default function BookingSuccessPage() {
  const router = useRouter();

  const handleContinueBrowsing = () => router.push('/');
  const handleViewBooking = () => router.push('/profile/bookings');

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* SUCCESS HEADER */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <IoCheckmarkCircle size={80} color="#4caf50" />
        <Typography variant="h3" sx={{ my: 2, fontWeight: 'bold', color: '#4caf50' }}>
          Booking Successful!
        </Typography>
        <Typography variant="body1">Thank you for your booking. Your puja has been confirmed.</Typography>
      </Box>

      {/* BUTTONS */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        <Button variant="contained" size="large" onClick={handleViewBooking}>
          View My Bookings
        </Button>

        <Button variant="outlined" size="large" onClick={handleContinueBrowsing} startIcon={<IoArrowBack />}>
          Continue Browsing
        </Button>
      </Stack>
    </Container>
  );
}
