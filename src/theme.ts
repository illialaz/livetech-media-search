'use client';
import darkScrollbar from '@mui/material/darkScrollbar';
import { createTheme } from '@mui/material/styles';
import { Montserrat } from 'next/font/google';

const font = Montserrat({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: font.style.fontFamily,
    fontWeightBold: 500,
    fontWeightRegular: 400,
    fontWeightLight: 300,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
      }),
    },
  },
});

export default theme;
