import type { NextPage } from "next";
import Head from "next/head";
import ListingTable from "../components/ListingTable";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Degen Scan</title>
        <meta name="description" content="Scan latest tokens" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <ResponsiveAppBar />
      <ListingTable />
      <footer>
      {/* TODO ? */}
      </footer>
    </>
  );
};

export default Home;
