'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

// mui
import { alpha } from '@mui/material/styles';
import { Toolbar, Stack, AppBar, useMediaQuery, Container, Badge } from '@mui/material';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { FiUser } from 'react-icons/fi';

// components
import Logo from '@/components/logo';
// Widgets
import WishlistWidget from '@/components/widgets/wishlist';
import CartWidget from '@/components/widgets/cart';
import CompareWidget from '@/components/widgets/compare';
import UserSelect from '@/components/select/user-select';
import NavigationMenu from '@/components/_main/navigation-menu';
// dynamic import components
const MobileBar = dynamic(() => import('@/layout/_main/mobile-bar'));

// ----------------------------------------------------------------------
export default function Navbar({ branding }) {
  const { checkout } = useSelector(({ product }) => product);
  const { user, isAuthenticated } = useSelector(({ user }) => user);
  const isMobile = useMediaQuery('(max-width:992px)');
  const [open, setOpen] = React.useState(false);

  // Calculate cart items count
  const cartItemsCount = checkout?.cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <>
      <AppBar
        sx={{
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          position: 'sticky',
          top: 0,
          zIndex: 999,
          borderRadius: 0,
          pr: '0px !important',
          bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          display: { md: 'block', xs: 'none' },
          '& .toolbar': {
            justifyContent: 'space-between',
            backdropFilter: 'blur(6px)',
            borderRadius: 0,
            WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
            bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
            px: 3,
            py: 1.5
          }
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="toolbar">
            {/* Left section - Logo */}
            <Stack direction="row" alignItems={'center'}>
              <Logo branding={branding} />
            </Stack>

            {/* Center section - Navigation Menu */}
            <Stack direction="row" alignItems={'center'} justifyContent="center" sx={{ flex: 1 }}>
              <NavigationMenu />
            </Stack>

            {/* Right section - User Account & Cart */}
            <Stack gap={1.5} direction="row" alignItems={'center'}>
              {/* My Account */}
              {!isAuthenticated ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                  sx={{
                    cursor: 'pointer',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    border: 1,
                    borderColor: 'primary.main',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white'
                    }
                  }}
                  onClick={() => (window.location.href = '/auth/sign-in')}
                >
                  <FiUser size={18} color="#000" />
                  <Stack gap={0}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#212020ff' }}>My Account</span>
                    </Stack>
                  </Stack>
                </Stack>
              ) : (
                <UserSelect />
              )}

              {/* Cart with Badge */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                component="a"
                href="/cart"
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  border: 1,
                  borderColor: 'divider',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04)
                  }
                }}
              >
                <Badge
                  badgeContent={cartItemsCount}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      top: -2,
                      right: -2,
                      minWidth: 18,
                      height: 18,
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }
                  }}
                >
                  <HiOutlineShoppingBag size={20} color="#F9A34A" />
                </Badge>
                <Stack gap={0}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#000' }}>Cart</span>
                  {cartItemsCount > 0 && (
                    <span style={{ fontSize: '0.7rem', color: '#000' }}>
                      {cartItemsCount} item{cartItemsCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      {isMobile && <MobileBar />}
    </>
  );
}
