'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';

// mui
import { Typography, Container, Stack, Box, Card, CardContent, Grid, Chip, Avatar, Alert } from '@mui/material';

// components
import HeaderBreadcrumbs from '@/components/header-breadcrumbs';
import ServiceCard from '@/components/cards/service';

// api
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';

// icons
import { MdPhone, MdEmail, MdLocationOn, MdWork } from 'react-icons/md';

export default function VendorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const vendorId = params.id;

  const { data: vendorData, isPending: vendorLoading, error: vendorError } = useQuery({
    queryKey: ['vendor-profile', vendorId],
    queryFn: () => api.getPanditProfile(vendorId),
    enabled: !!vendorId
  });

  const { data: servicesData, isPending: servicesLoading, error: servicesError } = useQuery({
    queryKey: ['vendor-services', vendorId],
    queryFn: () => api.getPanditServices(vendorId),
    enabled: !!vendorId
  });

  const vendor = vendorData?.payload?.vendor;
  const services = servicesData?.payload?.services || [];

  const handleBookService = async (booking) => {
    // This will be called when payment is successful
    alert(`Booking created successfully!\n\nBooking ID: ${booking.bookingID}\nService: ${booking.poojaType}\nPackage: ${booking.package}\nStatus: ${booking.status}`);
    
    // You can redirect to a booking confirmation page
    // router.push(`/booking/confirm/${booking.id}`);
  };

  if (vendorLoading) {
    return (
      <Container maxWidth="xl">
        <Stack gap={3}>
          <HeaderBreadcrumbs heading="Loading..." links={[{ name: 'Home', href: '/' }, { name: 'Pandits', href: '/shops' }]} />
          <Box>
            <Typography>Loading vendor details...</Typography>
          </Box>
        </Stack>
      </Container>
    );
  }

  if (vendorError || !vendor) {
    return (
      <Container maxWidth="xl">
        <Stack gap={3}>
          <HeaderBreadcrumbs heading="Vendor Not Found" links={[{ name: 'Home', href: '/' }, { name: 'Pandits', href: '/shops' }]} />
          <Box>
            <Typography variant="h3" color="error.main" textAlign="center">
              Vendor not found
            </Typography>
          </Box>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Stack gap={3}>
        <HeaderBreadcrumbs 
          heading={`${vendor.firstName} ${vendor.lastName}`} 
          links={[
            { name: 'Home', href: '/' }, 
            { name: 'Pandits', href: '/shops' }, 
            { name: `${vendor.firstName} ${vendor.lastName}` }
          ]} 
        />
        
        <Grid container spacing={3}>
          {/* Vendor Profile Card */}
          <Grid size={{ lg: 4, md: 12 }}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Avatar
                    src={vendor.image?.url || '/images/default-avatar.png'}
                    alt={`${vendor.firstName} ${vendor.lastName}`}
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mx: 'auto',
                      border: (theme) => `3px solid ${theme.palette.primary.main}`
                    }}
                  />
                </Box>
                
                <Typography variant="h4" gutterBottom>
                  {vendor.firstName} {vendor.lastName}
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Experienced Pandit
                </Typography>

                {/* Contact Information */}
                <Stack spacing={1} sx={{ mt: 2 }}>
                  {vendor.phone && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <MdPhone size={16} />
                      <Typography variant="body2">{vendor.phone}</Typography>
                    </Box>
                  )}
                  
                  {vendor.email && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <MdEmail size={16} />
                      <Typography variant="body2">{vendor.email}</Typography>
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Vendor Details */}
          <Grid size={{ lg: 8, md: 12 }}>
            <Stack spacing={3}>
              {/* About Section */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    About
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {vendor.about || 'Experienced pandit offering authentic pooja services with traditional rituals and modern convenience.'}
                  </Typography>
                </CardContent>
              </Card>

              {/* Services Section */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Services Offered
                  </Typography>
                  
                  {servicesLoading ? (
                    <Typography>Loading services...</Typography>
                  ) : servicesError ? (
                    <Alert severity="error">Failed to load services</Alert>
                  ) : services.length > 0 ? (
                    <Grid container spacing={2}>
                      {services.map((service) => (
                        <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4 }}>
                          <ServiceCard 
                            service={service} 
                            vendor={vendor} 
                            onBookService={handleBookService}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No services available at the moment
                    </Typography>
                  )}
                </CardContent>
              </Card>

              {/* Pandit Details */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Pandit Details
                  </Typography>
                  <Grid container spacing={2}>
                    {vendor.gotra && (
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Gotra
                        </Typography>
                        <Typography variant="body1">
                          {vendor.gotra}
                        </Typography>
                      </Grid>
                    )}
                    {vendor.veda && (
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Veda
                        </Typography>
                        <Typography variant="body1">
                          {vendor.veda}
                        </Typography>
                      </Grid>
                    )}
                    {vendor.pankti && (
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Pankti
                        </Typography>
                        <Typography variant="body1">
                          {vendor.pankti}
                        </Typography>
                      </Grid>
                    )}
                    {vendor.shakha && (
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Shakha
                        </Typography>
                        <Typography variant="body1">
                          {vendor.shakha}
                        </Typography>
                      </Grid>
                    )}
                    {vendor.sutra && (
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Sutra
                        </Typography>
                        <Typography variant="body1">
                          {vendor.sutra}
                        </Typography>
                      </Grid>
                    )}
                    {vendor.language && vendor.language.length > 0 && (
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Languages
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                          {vendor.language.map((lang, index) => (
                            <Chip 
                              key={index}
                              label={lang} 
                              size="small" 
                              variant="outlined"
                              sx={{ textTransform: 'capitalize' }}
                            />
                          ))}
                        </Stack>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card>
                {/* <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Additional Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Role
                      </Typography>
                      <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                        {vendor.role}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Services Count
                      </Typography>
                      <Typography variant="body1">
                        {services.length} services
                      </Typography>
                    </Grid>
                    {vendor.commission && (
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Commission
                        </Typography>
                        <Typography variant="body1">
                          {vendor.commission}%
                        </Typography>
                      </Grid>
                    )}
                    {vendor.experience && (
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Experience
                        </Typography>
                        <Typography variant="body1">
                          {vendor.experience}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </CardContent> */}
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
