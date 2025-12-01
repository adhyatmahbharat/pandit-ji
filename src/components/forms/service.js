'use client';
import React from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useRouter } from '@bprogress/next';

import { Form, FormikProvider, useFormik } from 'formik';

import { 
  Card, 
  Stack, 
  CardHeader, 
  CardContent, 
  Button, 
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Skeleton
} from '@mui/material';
// api
import * as api from 'src/services';
import { useMutation, useQuery } from '@tanstack/react-query';

// Pooja types from the Service model
const POOJA_TYPES = [
  "Satyanarayan Puja",
  "Rudhrabhishek Puja",
  "Mahamrityunyay Jaap",
  "Hanuman Chalisa Path",
  "Sunderkand Path",
  "Vivah Pujan",
  "Griha Pravesh Puja",
  "Kaal Sarp Dosh Puja",
  "Naamkaran Puja",
  "Shiv Puran Path",
  "Bhoomi Pujan",
  "Vastu Shanti Puja",
  "Manglik Dosh Puja",
  "Mool Shanti Puja",
  "New Office Opening Puja",
  "Marriage Anniversary Puja",
  "Garun Puran path",
  "Narayan Bali Puja",
  "Varshika Shradhya Puja",
  "Godh Bharai (Baby Shower Ceremaney)",
  "Kuber Upasana Puja",
  "Engagment Puja",
  "Janmdin Puja (Birthday)",
  "Santan Gopal Mantra Jaap",
  "Shuddhikaran Puja",
  "Gayatri Mantra Jaap",
  "Krishna Janmashtami Puja",
  "Hanuman Janmotsav Puja",
  "Ram Navami Puja",
  "Vishwakarma Puja",
  "Akshaya Tritiya Puja",
  "Navratri Puja",
  "Holika Puja",
  "Mangal Bhat Puja",
  "Saraswati Puja",
  "Diwali Puja",
  "Dhanteras Puja",
  "Govardhan Puja",
  "Mahalakshmi Puja",
  "Pind Daan Puja",
  "Pitra Paksha Shradhya Puja",
  "Pitra Dosh Puja",
  "Tripindi Shradhya Puja",
  "Gandmool Nakshtra Puja",
  "Antim Sanskar",
  "Ganpati Puja",
  "Haritalika Brat Katha",
  "Bharani Shradhya Puuja",
  "Rin Mukti Puja",
  "Angarak Dosh Puja",
  "Others"
];

// Price mapping for Pooja types
const POOJA_PRICE_MAP = {
  "Satyanarayan Puja": 2100,
  "Rudhrabhishek Puja": 5100,
  "Mahamrityunyay Jaap": 5100,
  "Hanuman Chalisa Path": 2100,
  "Sunderkand Path": 11000,
  "Vivah Pujan": 5100,
  "Griha Pravesh Puja": 2100,
  "Kaal Sarp Dosh Puja": 5100,
  "Naamkaran Puja": 2100,
  "Shiv Puran Path": 2100,
  "Bhoomi Pujan": 2100,
  "Vastu Shanti Puja": 1100,
  "Manglik Dosh Puja": 1100,
  "Mool Shanti Puja": 2100,
  "New Office Opening Puja": 5100,
  "Marriage Anniversary Puja": 1100,
  "Garun Puran path": 11000,
  "Narayan Bali Puja": 11000,
  "Varshika Shradhya Puja": 2100,
  "Godh Bharai (Baby Shower Ceremaney)": 1100,
  "Kuber Upasana Puja": 1100,
  "Engagment Puja": 1100,
  "Janmdin Puja (Birthday)": 1100,
  "Santan Gopal Mantra Jaap": 2100,
  "Shuddhikaran Puja": 2100,
  "Gayatri Mantra Jaap": 2100,
  "Krishna Janmashtami Puja": 1100,
  "Hanuman Janmotsav Puja": 1100,
  "Ram Navami Puja": 1100,
  "Vishwakarma Puja": 2100,
  "Akshaya Tritiya Puja": 2100,
  "Navratri Puja": 5100,
  "Holika Puja": 1100,
  "Mangal Bhat Puja": 1100,
  "Saraswati Puja": 1100,
  "Diwali Puja": 2100,
  "Dhanteras Puja": 2100,
  "Govardhan Puja": 1100,
  "Mahalakshmi Puja": 2100,
  "Pind Daan Puja": 2100,
  "Pitra Paksha Shradhya Puja": 2100,
  "Pitra Dosh Puja": 1100,
  "Tripindi Shradhya Puja": 2100,
  "Gandmool Nakshtra Puja": 2100,
  "Antim Sanskar": 1100,
  "Ganpati Puja": 2100,
  "Haritalika Brat Katha": 2100,
  "Bharani Shradhya Puuja": 2100,
  "Rin Mukti Puja": 1100,
  "Angarak Dosh Puja": 1100,
  "Others": 1100
};

const DURATION_OPTIONS = [
  "1 Hour",
  "2 Hours", 
  "3 Hours",
  "4 Hours",
  "5 Hours",
  "6 Hours",
  "Full Day",
  "2 Days",
  "3 Days",
  "1 Week",
  "Custom"
];

export default function ServiceForm({
  currentService,
  isLoading,
  isVendor
}) {
  const router = useRouter();

  // Fetch vendors for admin
  const { data: vendorsData } = useQuery({
    queryKey: ['vendors'],
    queryFn: () => api.getVendorsByAdmin(),
    enabled: !isVendor
  });

  const vendors = vendorsData?.data || [];

  const { mutate: createService, isPending: isCreating } = useMutation({
    mutationFn: isVendor ? api.createServiceByVendor : api.createServiceByAdmin,
    onSuccess: () => {
      toast.success('Pooja service created successfully!');
      router.push(isVendor ? '/vendor/services' : '/admin/services');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create service');
    }
  });

  const { mutate: updateService, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, ...data }) => isVendor 
      ? api.updateServiceByVendor({ id, ...data })
      : api.updateServiceByAdmin({ id, ...data }),
    onSuccess: () => {
      toast.success('Pooja service updated successfully!');
      router.push(isVendor ? '/vendor/services' : '/admin/services');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update service');
    }
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      poojaType: currentService?.poojaType || '',
      description: currentService?.description || '',
      duration: currentService?.duration || '',
      price: currentService?.price || '',
      vendor: currentService?.vendor?._id || currentService?.vendor || ''
    },
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          price: parseFloat(values.price)
        };

        if (currentService) {
          updateService({ id: currentService._id, ...payload });
        } else {
          createService(payload);
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { handleSubmit, values, errors, touched, setFieldValue, getFieldProps } = formik;

  // Handle Pooja Type change and auto-populate price
  const handlePoojaTypeChange = (event) => {
    const selectedPoojaType = event.target.value;
    
    // Update poojaType field
    setFieldValue('poojaType', selectedPoojaType);
    
    // Auto-populate price if mapping exists
    if (selectedPoojaType && POOJA_PRICE_MAP[selectedPoojaType]) {
      setFieldValue('price', POOJA_PRICE_MAP[selectedPoojaType]);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader title={<Skeleton variant="text" width={200} />} />
        <CardContent>
          <Stack spacing={3}>
            <Skeleton variant="rectangular" height={56} />
            <Skeleton variant="rectangular" height={56} />
            <Skeleton variant="rectangular" height={56} />
            <Skeleton variant="rectangular" height={100} />
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card>
          <CardHeader title={currentService ? 'Edit Pandit Ji Service' : 'Add Pandit Ji Service'} />
          <CardContent>
            <Stack spacing={3}>
              {!isVendor && (
                <FormControl fullWidth error={Boolean(touched.vendor && errors.vendor)}>
                  <InputLabel>Vendor</InputLabel>
                  <Select
                    {...getFieldProps('vendor')}
                    label="Vendor"
                  >
                    {vendors.map((vendor) => (
                      <MenuItem key={vendor._id} value={vendor._id}>
                        {vendor.firstName} {vendor.lastName} ({vendor.email})
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.vendor && errors.vendor && (
                    <FormHelperText>{errors.vendor}</FormHelperText>
                  )}
                </FormControl>
              )}

              <FormControl fullWidth error={Boolean(touched.poojaType && errors.poojaType)}>
                <InputLabel>Pooja Type</InputLabel>
                <Select
                  {...getFieldProps('poojaType')}
                  label="Pooja Type"
                  onChange={handlePoojaTypeChange}
                >
                  {POOJA_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {touched.poojaType && errors.poojaType && (
                  <FormHelperText>{errors.poojaType}</FormHelperText>
                )}
              </FormControl>

              <TextField
                {...getFieldProps('price')}
                fullWidth
                label="Price (₹)"
                type="number"
                error={Boolean(touched.price && errors.price)}
                helperText={touched.price && errors.price}
                placeholder="Enter price"
              />

              <FormControl fullWidth error={Boolean(touched.duration && errors.duration)}>
                <InputLabel>Duration</InputLabel>
                <Select
                  {...getFieldProps('duration')}
                  label="Duration"
                >
                  {DURATION_OPTIONS.map((duration) => (
                    <MenuItem key={duration} value={duration}>
                      {duration}
                    </MenuItem>
                  ))}
                </Select>
                {touched.duration && errors.duration && (
                  <FormHelperText>{errors.duration}</FormHelperText>
                )}
              </FormControl>

              <TextField
                {...getFieldProps('description')}
                fullWidth
                multiline
                rows={4}
                label="Description"
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
                placeholder="Enter service description"
              />

              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => router.push('/vendor/services')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isCreating || isUpdating}
                >
                  {isCreating || isUpdating ? 'Processing...' : (currentService ? 'Update Service' : 'Create Service')}
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Form>
    </FormikProvider>
  );
}

ServiceForm.propTypes = {
  currentService: PropTypes.object,
  isLoading: PropTypes.bool,
  isVendor: PropTypes.bool
};
