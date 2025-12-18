'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// MUI
import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { FiMenu } from 'react-icons/fi';

// Theme
import { useTheme } from '@mui/material/styles';

/* ---------------- DATA ---------------- */

const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

/* ---------------- COMPONENT ---------------- */

export default function NavigationMenu() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  /* -------- Mobile Drawer -------- */
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const toggleMobile = () => setMobileOpen((prev) => !prev);

  const navigate = (href) => {
    router.push(href);
    setMobileOpen(false);
  };

  /* ---------------- MOBILE DRAWER ---------------- */

  const MobileDrawer = () => (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={toggleMobile}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          bgcolor: 'background.paper'
        }
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight={700}>
          Menu
        </Typography>
      </Box>

      <List disablePadding>
        {NAVIGATION_ITEMS.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ py: 1.5 }} onClick={() => navigate(item.href)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  /* ---------------- DESKTOP MENU ---------------- */

  const DesktopNavigation = () => (
    <Stack direction="row" alignItems="center" spacing={1}>
      {NAVIGATION_ITEMS.map((item) => (
        <Button
          key={item.label}
          component={Link}
          href={item.href}
          sx={{
            px: 2,
            py: 1.5,
            fontWeight: 500,
            color: 'text.primary',
            textTransform: 'none',
            '&:hover': {
              color: 'primary.main',
              bgcolor: 'action.hover'
            }
          }}
        >
          {item.label}
        </Button>
      ))}
    </Stack>
  );

  /* ---------------- RENDER ---------------- */

  return (
    <>
      {/* Mobile hamburger */}
      {isMobile && (
        <IconButton onClick={toggleMobile}>
          <FiMenu size={20} />
        </IconButton>
      )}

      {/* Desktop menu */}
      {!isMobile && <DesktopNavigation />}

      {/* Mobile drawer */}
      {isMobile && <MobileDrawer />}
    </>
  );
}
