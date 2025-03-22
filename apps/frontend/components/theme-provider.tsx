"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // During prerendering (server-side), render only children
  if (!mounted) {
    return <>{children}</>;
  }

  // After mounting (client-side), render with ThemeProvider
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}