import type { NextPage } from "next";
import Head from "next/head";
import Box from "@mui/material/Box";
import ListingTable from "../components/ListingTable";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import MatrixRain from "../components/MatrixRain";
import { APP_NAME } from "../config";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content="Scan latest tokens" />
      </Head>
      <MatrixRain />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <ResponsiveAppBar />
        <ListingTable />
      </Box>
    </>
  );
};

export default Home;
