"use client"
import { createTheme } from "@mui/material";

const mainColor = "58, 53, 65";

let theme = createTheme({
  palette: {
    customColors: {
      main: mainColor,
      primaryGradient: "#C6A7FE",
      tableHeaderBg: '#F9FAFC'
    },
    common: {
      black: "#000",
      white: "#FFF",
    },
    primary: {
      light: "#588cd0",
      main: "#3b79c9",
      dark: "#804BDF",
      contrastText: "#FFF",
    },
    secondary: {
      light: "#9C9FA4",
      main: "#8A8D93",
      dark: "#777B82",
      contrastText: "#FFF",
    },
    success: {
      light: "#6AD01F",
      main: "#56CA00",
      dark: "#4CB200",
      contrastText: "#FFF",
    },
    error: {
      light: "#FF6166",
      main: "#FF4C51",
      dark: "#E04347",
      contrastText: "#FFF",
    },
    warning: {
      light: "#FFCA64",
      main: "#FFB400",
      dark: "#E09E00",
      contrastText: "#FFF",
    },
    info: {
      light: "#32BAFF",
      main: "#16B1FF",
      dark: "#139CE0",
      contrastText: "#FFF",
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#D5D5D5",
      A200: "#AAAAAA",
      A400: "#616161",
      A700: "#303030",
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.68)`,
      disabled: `rgba(${mainColor}, 0.38)`,
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: "#FFF",
      default: "#F4F5FA",
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.3)`,
      disabledBackground: `rgba(${mainColor}, 0.18)`,
      focus: `rgba(${mainColor}, 0.12)`,
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "sans-serif",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(58, 53, 65, 0.2), 0px 1px 1px 0px rgba(58, 53, 65, 0.14), 0px 1px 3px 0px rgba(58, 53, 65, 0.12)",
    "0px 3px 1px -2px rgba(58, 53, 65, 0.2), 0px 2px 2px 0px rgba(58, 53, 65, 0.14), 0px 1px 5px 0px rgba(58, 53, 65, 0.12)",
    "0px 4px 8px -4px rgba(58, 53, 65, 0.42)",
    "0px 6px 18px -8px rgba(58, 53, 65, 0.56)",
    "0px 3px 5px -1px rgba(58, 53, 65, 0.2), 0px 5px 8px 0px rgba(58, 53, 65, 0.14), 0px 1px 14px 0px rgba(58, 53, 65, 0.12)",
    "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
    "0px 4px 5px -2px rgba(58, 53, 65, 0.2), 0px 7px 10px 1px rgba(58, 53, 65, 0.14), 0px 2px 16px 1px rgba(58, 53, 65, 0.12)",
    "0px 5px 5px -3px rgba(58, 53, 65, 0.2), 0px 8px 10px 1px rgba(58, 53, 65, 0.14), 0px 3px 14px 2px rgba(58, 53, 65, 0.12)",
    "0px 5px 6px -3px rgba(58, 53, 65, 0.2), 0px 9px 12px 1px rgba(58, 53, 65, 0.14), 0px 3px 16px 2px rgba(58, 53, 65, 0.12)",
    "0px 6px 6px -3px rgba(58, 53, 65, 0.2), 0px 10px 14px 1px rgba(58, 53, 65, 0.14), 0px 4px 18px 3px rgba(58, 53, 65, 0.12)",
    "0px 6px 7px -4px rgba(58, 53, 65, 0.2), 0px 11px 15px 1px rgba(58, 53, 65, 0.14), 0px 4px 20px 3px rgba(58, 53, 65, 0.12)",
    "0px 7px 8px -4px rgba(58, 53, 65, 0.2), 0px 12px 17px 2px rgba(58, 53, 65, 0.14), 0px 5px 22px 4px rgba(58, 53, 65, 0.12)",
    "0px 7px 8px -4px rgba(58, 53, 65, 0.2), 0px 13px 19px 2px rgba(58, 53, 65, 0.14), 0px 5px 24px 4px rgba(58, 53, 65, 0.12)",
    "0px 7px 9px -4px rgba(58, 53, 65, 0.2), 0px 14px 21px 2px rgba(58, 53, 65, 0.14), 0px 5px 26px 4px rgba(58, 53, 65, 0.12)",
    "0px 8px 9px -5px rgba(58, 53, 65, 0.2), 0px 15px 22px 2px rgba(58, 53, 65, 0.14), 0px 6px 28px 5px rgba(58, 53, 65, 0.12)",
    "0px 8px 10px -5px rgba(58, 53, 65, 0.2), 0px 16px 24px 2px rgba(58, 53, 65, 0.14), 0px 6px 30px 5px rgba(58, 53, 65, 0.12)",
    "0px 8px 11px -5px rgba(58, 53, 65, 0.2), 0px 17px 26px 2px rgba(58, 53, 65, 0.14), 0px 6px 32px 5px rgba(58, 53, 65, 0.12)",
    "0px 9px 11px -5px rgba(58, 53, 65, 0.2), 0px 18px 28px 2px rgba(58, 53, 65, 0.14), 0px 7px 34px 6px rgba(58, 53, 65, 0.12)",
    "0px 9px 12px -6px rgba(58, 53, 65, 0.2), 0px 19px 29px 2px rgba(58, 53, 65, 0.14), 0px 7px 36px 6px rgba(58, 53, 65, 0.12)",
    "0px 10px 13px -6px rgba(58, 53, 65, 0.2), 0px 20px 31px 3px rgba(58, 53, 65, 0.14), 0px 8px 38px 7px rgba(58, 53, 65, 0.12)",
    "0px 10px 13px -6px rgba(58, 53, 65, 0.2), 0px 21px 33px 3px rgba(58, 53, 65, 0.14), 0px 8px 40px 7px rgba(58, 53, 65, 0.12)",
    "0px 10px 14px -6px rgba(58, 53, 65, 0.2), 0px 22px 35px 3px rgba(58, 53, 65, 0.14), 0px 8px 42px 7px rgba(58, 53, 65, 0.12)",
    "0px 11px 14px -7px rgba(58, 53, 65, 0.2), 0px 23px 36px 3px rgba(58, 53, 65, 0.14), 0px 9px 44px 8px rgba(58, 53, 65, 0.12)",
    "0px 11px 15px -7px rgba(58, 53, 65, 0.2), 0px 24px 38px 3px rgba(58, 53, 65, 0.14), 0px 9px 46px 8px rgba(58, 53, 65, 0.12)",
  ],
  shape: {
    borderRadius: 6,
  },
  mixins: {
    toolbar: {
      minHeight: 64,
    },
  },
});

export default theme;
