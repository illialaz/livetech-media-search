import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';

import Header from '@/components/header';
import StoreProvider from '@/providers/store-provider';
import theme from '@/theme';

export const metadata: Metadata = {
  title: 'Livetech Media Search',
  description:
    'Web application with common features of searching media content, allowing users to search for music, books, and other media using the iTunes Search API',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <StoreProvider>
              <>
                <CssBaseline enableColorScheme />
                <Header />
                {children}
              </>
            </StoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
