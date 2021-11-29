import type { NextPage } from "next";
import Head from "next/head";
import CenterScreen from "../components/Center";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify Clone</title>
        <meta name="description" content="Spotify Clone with Nextjs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar />
        <CenterScreen />
      </main>

      <div>{/* Player */}</div>
    </div>
  );
};

export default Home;
