"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import theme from "../theme";
import { ThemeProvider } from "styled-components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Vé Xe Cực Rẻ</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <ThemeProvider theme={theme}>
        <body style={{ backgroundColor: theme.palette.common.white }}>
          <Header />
          <div style={{minHeight: "100vh"}}>{children}</div>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
