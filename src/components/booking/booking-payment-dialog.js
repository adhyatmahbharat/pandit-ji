'use client';
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// mui
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';

// api
import * as api from 'src/services';

export default function BookingPaymentDialog({ 
  open, 
  onClose, 
  bookingData, 
  onSuccess, 
  onError 
}) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [bookingCreated, setBookingCreated] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState(null);

  const createBooking = useCallback(async () => {
    if (!bookingData) return;

    setProcessing(true);
    setError(null);

    try {
      // First create the booking
      const response = await api.createBooking(bookingData);

      if (response.error === false) {
        setBookingCreated(true);
        setCreatedBookingId(response.payload.booking.id);
        return response.payload.booking;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create booking');
      setProcessing(false);
      throw err;
    }
  }, [bookingData]);

  const handleStripePayment = useCallback(async () => {
    if (!bookingData) return;

    try {
      // Create booking first
      const booking = await createBooking();
      
      // Then create payment for the booking
      const paymentResponse = await api.createBookingPayment({
        bookingId: booking.id,
        currency: 'INR'
      });

      if (paymentResponse.error === false) {
        // Redirect to Stripe payment URL
        window.location.href = paymentResponse.payload.payment_url;
      } else {
        throw new Error(paymentResponse.message);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to initialize payment');
      setProcessing(false);
    }
  }, [bookingData, createBooking]);

  const handleClose = () => {
    if (!processing) {
      setError(null);
      setBookingCreated(false);
      setCreatedBookingId(null);
      onClose();
    }
  };

  React.useEffect(() => {
    if (open && !processing && !bookingCreated) {
      handleStripePayment();
    }
  }, [open, processing, bookingCreated, handleStripePayment]);

  if (!bookingData) return null;

  const selectedPackage = bookingData.package;
  const advanceAmount = bookingData.paymentAmount;
  const totalAmount = bookingData.totalAmount;

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      disableEscapeKeyDown={processing}
    >
      <DialogTitle>
        Complete Your Booking
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {bookingData.poojaType} - {selectedPackage}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Stack spacing={3}>
          {/* Payment Summary */}
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, border: 1, borderColor: 'divider' }}>
            <Typography variant="h6" gutterBottom>
              Payment Summary
            </Typography>
            
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Service:</Typography>
                <Typography variant="body2">{bookingData.poojaType}</Typography>
              </Stack>
              
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Package:</Typography>
                <Typography variant="body2">{selectedPackage}</Typography>
              </Stack>
              
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Date & Time:</Typography>
                <Typography variant="body2">
                  {new Date(bookingData.dateTime).toLocaleDateString()} at {new Date(bookingData.dateTime).toLocaleTimeString()}
                </Typography>
              </Stack>
              
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Duration:</Typography>
                <Typography variant="body2">{bookingData.duration}</Typography>
              </Stack>
              
              <Divider />
              
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Total Amount:</Typography>
                <Typography variant="body2">₹{totalAmount}</Typography>
              </Stack>
              
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="primary">Advance Payment (30%):</Typography>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  ₹{advanceAmount}
                </Typography>
              </Stack>
              
              <Typography variant="caption" color="text.secondary">
                Remaining ₹{totalAmount - advanceAmount} to be paid on service completion
              </Typography>
            </Stack>
          </Box>

          {/* Error Display */}
          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          {/* Payment Method Selection */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button
                variant="contained"
                disabled={processing}
                sx={{ backgroundColor: 'primary.main', color: 'white' }}
              >
                Stripe (Card)
              </Button>
            </Stack>
          </Box>

          {/* Processing Payment */}
          {processing && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress size={40} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Processing Payment...
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Please wait while we redirect you to the payment page.
              </Typography>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} disabled={processing}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BookingPaymentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  bookingData: PropTypes.shape({
    vendorId: PropTypes.string.isRequired,
    serviceId: PropTypes.string.isRequired,
    poojaType: PropTypes.string.isRequired,
    package: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    pujaSamagri: PropTypes.string.isRequired,
    paymentAmount: PropTypes.number.isRequired,
    totalAmount: PropTypes.number.isRequired
  }),
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};
