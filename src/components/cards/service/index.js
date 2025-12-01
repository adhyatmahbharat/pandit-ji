'use client';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

// mui
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Chip, 
  Stack, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField,
  Grid,
  Divider,
  Alert
} from '@mui/material';

// components
import BookingPaymentDialog from '@/components/booking/booking-payment-dialog';

// icons
import { MdAccessTime, MdAttachMoney, MdDescription } from 'react-icons/md';

export default function ServiceCard({ service, vendor, onBookService }) {
  const router = useRouter();
  const { isAuthenticated } = useSelector(({ user }) => user);
  
  const [open, setOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState('');
  const [advancePayment, setAdvancePayment] = useState('');
  const [formError, setFormError] = useState('');

  // Set default date, time, and advance payment when dialog opens
  React.useEffect(() => {
    if (open) {
      if (!selectedDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setSelectedDate(tomorrow.toISOString().split('T')[0]);
      }
      if (!selectedTime) {
        setSelectedTime('10:00'); // Default to 10:00 AM
      }
      if (!advancePayment) {
        setAdvancePayment(Math.round(service.price * 0.3)); // Default to 30%
      }
    }
  }, [open, selectedDate, selectedTime, advancePayment, service.price]);


  const handleBookService = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error('Please login to proceed with payment');
      const currentUrl = window.location.pathname + window.location.search;
      router.push(`/auth/sign-in?redirect=${encodeURIComponent(currentUrl)}`);
      return;
    }

    // Clear any previous errors
    setFormError('');

    // Validate all required fields
    if (!selectedDate) {
      setFormError('Please select a date');
      return;
    }
    if (!selectedTime) {
      setFormError('Please select a time');
      return;
    }
    if (!address.trim()) {
      setFormError('Please enter the service address');
      return;
    }
    if (!advancePayment || advancePayment < Math.round(service.price * 0.3)) {
      setFormError(`Advance payment must be at least ₹${Math.round(service.price * 0.3)} (30% of service price)`);
      return;
    }
    if (advancePayment > service.price) {
      setFormError('Advance payment cannot exceed the total service price');
      return;
    }

    // Validate date is not in the past
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const now = new Date();
    if (selectedDateTime <= now) {
      setFormError('Please select a future date and time');
      return;
    }

    // All validations passed, open payment dialog
    setPaymentDialogOpen(true);
    setOpen(false);
  };

  const handlePaymentSuccess = (booking) => {
    setPaymentDialogOpen(false);
    onBookService(booking);
    // Reset form
    setSelectedPackage('');
    setSelectedDate('');
    setSelectedTime('');
    setAddress('');
    setFormError('');
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    // You can show a toast notification here
  };

  const handleClose = () => {
    setOpen(false);
    setFormError('');
    // Reset form fields
    setSelectedPackage('');
    setSelectedDate('');
    setSelectedTime('');
    setAddress('');
  };

  return (
    <>
      <Card 
        sx={{ 
          cursor: 'pointer', 
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 3
          }
        }}
        onClick={() => {
          // Check if user is authenticated before opening dialog
          if (!isAuthenticated) {
            toast.error('Please login to book services');
            const currentUrl = window.location.pathname + window.location.search;
            router.push(`/auth/sign-in?redirect=${encodeURIComponent(currentUrl)}`);
            return;
          }
          setOpen(true);
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            {service.poojaType}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
            {service.description || 'Traditional pooja service with authentic rituals'}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Chip
              icon={<MdAccessTime size={16} />}
              label={service.duration}
              size="small"
              color="info"
              variant="outlined"
            />
            <Chip
              label={`₹${service.price}`}
              size="small"
              color="success"
              variant="outlined"
            />
          </Stack>

          <Button 
            variant="contained" 
            fullWidth 
            size="small"
            sx={{ borderRadius: 2 }}
          >
            {isAuthenticated ? 'View Details & Book' : 'Login to Book Service'}
          </Button>
        </CardContent>
      </Card>

      {/* Service Details Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {service.poojaType}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            by {vendor.firstName} {vendor.lastName}
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={3}>
            {/* Service Details */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Service Details
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body2">
                  {service.description || 'Traditional pooja service with authentic rituals and modern convenience.'}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Duration
                </Typography>
                <Typography variant="body2">
                  {service.duration}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Base Price
                </Typography>
                <Typography variant="h6" color="primary">
                  ₹{service.price}
                </Typography>
              </Box>
            </Grid>

            {/* Booking Form */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Book Service
              </Typography>

              <Box sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Service Name
                </Typography>
                <Typography variant="h6" color="primary">
                  {service.poojaType}
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Select Date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
                inputProps={{ min: new Date().toISOString().split('T')[0] }}
              />

              <TextField
                fullWidth
                label="Select Time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Service Address"
                multiline
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter complete address where service is required"
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Advance Payment Amount"
                type="number"
                value={advancePayment}
                onChange={(e) => setAdvancePayment(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
                }}
                helperText={`Minimum: ₹${Math.round(service.price * 0.3)} (30% of service price)`}
                inputProps={{ 
                  min: Math.round(service.price * 0.3),
                  max: service.price
                }}
              />

              {formError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {formError}
                </Alert>
              )}

              <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, border: 1, borderColor: 'divider' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Payment Summary
                </Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="body2">Service Price:</Typography>
                  <Typography variant="body2">₹{service.price}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="body2">Advance Payment:</Typography>
                  <Typography variant="body2" color="primary" fontWeight="bold">
                    ₹{advancePayment || Math.round(service.price * 0.3)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="body2">Remaining Amount:</Typography>
                  <Typography variant="body2">
                    ₹{service.price - (advancePayment || Math.round(service.price * 0.3))}
                  </Typography>
                </Stack>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" color="text.secondary">
                  Remaining amount to be paid on service completion
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleBookService}
            disabled={!selectedDate || !selectedTime || !address || !advancePayment || advancePayment < Math.round(service.price * 0.3)}
          >
            Proceed to Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Booking Payment Dialog */}
      {paymentDialogOpen && selectedDate && selectedTime && address && (
        <BookingPaymentDialog
          open={paymentDialogOpen}
          onClose={() => setPaymentDialogOpen(false)}
          bookingData={{
            vendorId: vendor.id,
            serviceId: service.id,
            poojaType: service.poojaType,
            package: service.poojaType,
            dateTime: new Date(`${selectedDate}T${selectedTime}`).toISOString(),
            duration: service.duration,
            address: address,
            pujaSamagri: service.description || 'Traditional pooja service with authentic rituals',
            paymentAmount: advancePayment || Math.round(service.price * 0.3),
            totalAmount: service.price
          }}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}
    </>
  );
}

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    poojaType: PropTypes.string.isRequired,
    description: PropTypes.string,
    duration: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  vendor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }).isRequired,
  onBookService: PropTypes.func.isRequired
};
