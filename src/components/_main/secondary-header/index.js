'use client';
import React from 'react';

// mui
import {
  Box,
  Button,
  Typography,
  Stack,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Menu,
  MenuItem
} from '@mui/material';
import { FiMenu } from 'react-icons/fi';
import { HiChevronDown } from 'react-icons/hi2';

// components
import SearchEnhanced from '@/components/widgets/search-enhanced';

// Theme
import { useTheme } from '@mui/material/styles';

const CATEGORIES = [
  { label: 'All Categories', href: '/products', value: 'all' },
  { label: 'Electronics', href: '/products?category=electronics', value: 'electronics' },
  { label: 'Fashion & Clothing', href: '/products?category=fashion', value: 'fashion' },
  { label: 'Home & Garden', href: '/products?category=home-garden', value: 'home-garden' },
  { label: 'Books & Education', href: '/products?category=books', value: 'books' },
  { label: 'Beauty & Health', href: '/products?category=beauty-health', value: 'beauty-health' },
  { label: 'Sports & Fitness', href: '/products?category=sports-fitness', value: 'sports-fitness' },
  { label: 'Toys & Games', href: '/products?category=toys-games', value: 'toys-games' },
  { label: 'Automotive', href: '/products?category=automotive', value: 'automotive' },
  { label: 'Food & Beverages', href: '/products?category=food-beverages', value: 'food-beverages' }
];

export default function SecondaryHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Mobile drawer
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Desktop menu
  const [categoriesAnchor, setCategoriesAnchor] = React.useState(null);
  const categoriesOpen = Boolean(categoriesAnchor);

  /* ---------------- Mobile ---------------- */
  const handleMobileToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  /* ---------------- Desktop Hover ---------------- */
  const handleCategoriesMouseEnter = (event) => {
    if (!isMobile) {
      setCategoriesAnchor(event.currentTarget);
    }
  };

  const handleCategoriesClose = () => {
    setCategoriesAnchor(null);
  };

  /* ---------------- Mobile Drawer ---------------- */
  const CategoryDrawer = () => (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={handleMobileToggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          bgcolor: 'background.paper'
        }
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          Shop Categories
        </Typography>
      </Box>

      <List disablePadding>
        {CATEGORIES.map((category, index) => (
          <React.Fragment key={category.value}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ py: 1.5 }}
                onClick={() => {
                  window.location.href = category.href;
                  setMobileOpen(false);
                }}
              >
                <ListItemText
                  primary={category.label}
                  primaryTypographyProps={{
                    fontWeight: index === 0 ? 600 : 400
                  }}
                />
              </ListItemButton>
            </ListItem>
            {index < CATEGORIES.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );

  return (
    <Box
      sx={{
        position: 'sticky',
        alignItems: 'center',
        top: { xs: 56, md: 64 },
        zIndex: 998,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
      }}
    >
      <Box
        sx={{
          maxWidth: 'xl',
          mx: 'auto',
          px: { xs: 2, md: 3 },
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3
        }}
      >
        {/* Shop Categories Button */}
        <Button
          id="category-button"
          startIcon={<FiMenu />}
          endIcon={<HiChevronDown />}
          onMouseEnter={handleCategoriesMouseEnter}
          sx={{
            height: 56,
            px: 2,
            borderRadius: 2,
            bgcolor: '#F9A34A',
            color: '#fff',
            fontWeight: 600,
            fontSize: { xs: '0.85rem', md: '0.95rem' },
            boxShadow: '0 2px 8px rgba(249,163,74,0.25)',
            '&:hover': { bgcolor: '#e6953d' },
            '& svg:last-child': {
              transition: 'transform 0.2s',
              transform: categoriesOpen ? 'rotate(180deg)' : 'rotate(0deg)'
            }
          }}
          onClick={() => isMobile && handleMobileToggle()}
        >
          {isMobile ? 'Categories' : 'Shop Categories'}
        </Button>

        {/* Desktop Dropdown */}
        {!isMobile && (
          <Menu
            anchorEl={categoriesAnchor}
            open={categoriesOpen}
            onClose={handleCategoriesClose}
            disableAutoFocusItem
            disableRestoreFocus
            disableEnforceFocus
            MenuListProps={{
              'aria-labelledby': 'category-button',
              onMouseEnter: () => {},
              onMouseLeave: handleCategoriesClose
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 240,
                borderRadius: 2,
                '& .MuiMenuItem-root': {
                  py: 1.5,
                  fontSize: '0.9rem',
                  '&:hover': {
                    bgcolor: '#F9A34A',
                    color: '#fff'
                  }
                }
              }
            }}
          >
            {CATEGORIES.map((category) => (
              <MenuItem
                key={category.value}
                onClick={() => {
                  window.location.href = category.href;
                  handleCategoriesClose();
                }}
              >
                {category.label}
              </MenuItem>
            ))}
          </Menu>
        )}

        {/* Search */}
        <Box sx={{ flex: 1, marginLeft: isMobile ? 0 : 20 }}>
          <SearchEnhanced />
        </Box>

        {/* Right placeholder */}
        <Box sx={{ minWidth: 160, display: { xs: 'none', md: 'block' } }} />
      </Box>

      {/* Mobile Drawer */}
      {isMobile && <CategoryDrawer />}
    </Box>
  );
}
