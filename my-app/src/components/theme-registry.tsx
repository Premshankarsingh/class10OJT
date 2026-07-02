"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createCustomTheme } from "@/src/themes";

export default function ThemeRegistry({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = createCustomTheme();

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
