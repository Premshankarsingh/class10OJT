"use client";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createCustomTheme } from "@/src/themes";
import type { EmotionCache } from "@emotion/cache";

export default function ClientProviders({
  children,
  cache,
}: {
  children: React.ReactNode;
  cache: EmotionCache;
}) {
  const theme = createCustomTheme();

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
