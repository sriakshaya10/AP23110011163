"use client";
import * as React from "react";
import { AppBar, Toolbar, Typography, Button, Container, ThemeProvider, createTheme } from "@mui/material";
import Link from "next/link";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
  },
});

export default function MUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Notifications
          </Typography>
          <Link href="/all-notifications" style={{ textDecoration: 'none' }}>
            <Button color="inherit">
              All
            </Button>
          </Link>
          <Link href="/priority-notifications" style={{ textDecoration: 'none' }}>
            <Button color="inherit">
              Priority
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ minHeight: '80vh', py: 2 }}>
        {children}
      </Container>
    </ThemeProvider>
  );
}
