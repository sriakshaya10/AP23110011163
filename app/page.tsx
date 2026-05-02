"use client";
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <Typography variant="h3" fontWeight="bold" mb={2} align="center">
        Welcome to Notifications App
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={4} align="center">
        View all your notifications or filter for priority ones.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Link href="/all-notifications" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            All Notifications
          </Button>
        </Link>
        <Link href="/priority-notifications" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" color="primary">
            Priority Notifications
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
// ...existing code...
