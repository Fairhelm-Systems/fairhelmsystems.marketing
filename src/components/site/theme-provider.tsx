"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Dark is the family default (squarecampus.com ships the same). The theme
 * class lands on <html> before first paint, so a static export never flashes.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="fairhelm-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
