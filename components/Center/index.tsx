import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
const colors = [
  "from-indigo",
  "from-red",
  "from-orange",
  "from-yellow",
  "from-green",
  "from-blue",
  "from-purple",
  "from-pink",
];
const CenterScreen = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState<string | undefined | null>(null);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);

  return (
    <div className="flex-grow text-white">
      <header className="absolute right-8 top-5">
        {session?.user && (
          <div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
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
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color}-500 h-80 text-white p-8`}
      >
        <h1>Hello</h1>
      </section>
    </div>
  );
};

export default CenterScreen;
