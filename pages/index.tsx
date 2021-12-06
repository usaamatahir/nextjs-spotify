import type { NextPage } from "next";
import { getSession, GetSessionParams } from "next-auth/react";
import Head from "next/head";
import CenterScreen from "../components/Center";
import Player from "../components/Player";
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

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
