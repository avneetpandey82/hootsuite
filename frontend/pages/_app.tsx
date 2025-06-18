import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
// import Hootimage from "../assets/Hootsuite-02.jpg";
const theme = createTheme();
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Dashboard | Hootsuite</title>
        <link rel="icon" href="/Hootsuite-Logo.png" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
