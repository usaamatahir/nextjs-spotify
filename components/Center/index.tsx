import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Playlist,
  playlistIdState,
  playlistState,
} from "../../atoms/playlistAtom";
import useSpotify from "../../hooks/useSpotify";
import Songs from "./Songs";
const colors = [
  "from-indigo-500",
  "from-red-500",
  "from-yellow-500",
  "from-green-500",
  "from-blue-500",
  "from-purple-500",
  "from-pink-500",
];
const CenterScreen = () => {
  const { data: session } = useSession();
  const spotifyAPI = useSpotify();
  const [color, setColor] = useState<string | undefined | null>(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState<Playlist>(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyAPI
      .getPlaylist(playlistId)
      .then((data) => setPlaylist(data.body))
      .catch((err) => console.log("Something went wrong ==> ", err));
  }, [spotifyAPI, playlistId]);

  console.log(playlist);
  return (
    <div className="flex-grow text-white h-screen overflow-y-hidden scrollbar-hide">
      <header className="absolute right-8 top-5">
        {session?.user && (
          <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
            <Image
              src={
                session.user.image ||
                "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              }
              alt={session.user.name || "UserName"}
              width={40}
              height={40}
              className="rounded-full mr-4"
            />
            <h2>{session.user.name}</h2>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        )}
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images[0].url}
          alt={playlist?.name}
        />
        <div>
          <p>Playlist</p>
          <h2 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h2>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default CenterScreen;
