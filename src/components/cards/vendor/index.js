'use client';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from '@bprogress/next';
// mui
import { Typography, Card, Box, Skeleton, Stack, Button, CardContent, Divider, Rating } from '@mui/material';
// components
import Image from '@/components/blur-image';
// icons
import { AiOutlineUser } from 'react-icons/ai';

export default function VendorCard({ vendor, isLoading }) {
  const router = useRouter();
  const baseUrl = '/vendors/';

  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent>
        {/* Vendor Profile Image */}
        <Box>
          {isLoading ? (
            <Skeleton variant="circular" sx={{ height: 70, width: 70, mx: 'auto' }} />
          ) : (
            <Box
              sx={{
                position: 'relative',
                height: 70,
                width: 70,
                minWidth: 70,
                borderRadius: '50%',
                bgcolor: 'background.paper',
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  height: 64,
                  width: 64,
                  minWidth: 64,
                  borderRadius: '50%',
                  img: { borderRadius: '50%' },
                  '&:after': { content: `""`, display: 'block', paddingBottom: '100%' }
                }}
              >
                <Image
                  alt="vendor"
                  src={vendor?.image?.url || '/images/default-avatar.png'}
                  layout="fill"
                  objectFit="cover"
                  draggable="false"
                  quality={5}
                  sizes={'50vw'}
                />
              </Box>
            </Box>
          )}
        </Box>

        {/* Vendor Name + Description */}
        <Stack spacing={1} alignItems={'center'} textAlign={'center'}>
          <Typography
            {...(!isLoading && { component: Link, href: baseUrl + vendor?.id })}
            color="text.primary"
            variant="h6"
          >
            {isLoading ? <Skeleton variant="text" width={100} /> : `${vendor?.firstName} ${vendor?.lastName}`}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body1"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2, // limit to 2 lines
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal'
            }}
          >
            {isLoading ? (
              <>
                <Skeleton variant="text" width={140} />
                <Skeleton variant="text" width={140} />{' '}
              </>
            ) : (
              vendor?.about || 'Experienced Pandit offering authentic pooja services'
            )}
          </Typography>
          {isLoading ? (
            <Skeleton variant="text" width={80} />
          ) : (
            <Rating value={4.5} precision={0.5} readOnly />
          )}
        </Stack>

        {/* View Profile Button */}
        <Stack direction="row" justifyContent="center" mt={2}>
          {isLoading ? (
            <Skeleton variant="rectangular" width={121} height={32} sx={{ borderRadius: '24px' }} />
          ) : (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => router.push(baseUrl + vendor?.id)}
              startIcon={<AiOutlineUser />}
              sx={{ borderRadius: 6, fontWeight: 400, whiteSpace: 'nowrap', px: 2 }}
            >
              View Profile
            </Button>
          )}
        </Stack>
      </CardContent>

      {/* Services Count */}
      <Divider />
      <CardContent sx={{ py: '16px !important' }}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Stack alignItems="center">
            <Typography variant="subtitle2" color="text.secondary">
              {isLoading ? <Skeleton variant="text" width={50} /> : 'Services'}
            </Typography>
            <Typography variant="h5" color="text.primary">
              {isLoading ? <Skeleton variant="text" width={100} /> : vendor?.services?.length || 0}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

VendorCard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  vendor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    about: PropTypes.string,
    image: PropTypes.shape({ url: PropTypes.string }),
    services: PropTypes.array
  }).isRequired
};
