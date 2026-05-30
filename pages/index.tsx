import type { NextPage } from "next";
import Head from "next/head";
import Box from "@mui/material/Box";
import ListingTable from "../components/ListingTable";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { APP_NAME } from "../config";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content="Scan latest tokens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <ResponsiveAppBar />
        <ListingTable />
      </Box>
    </>
  );
};

export default Home;
