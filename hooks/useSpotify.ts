import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import spotifyApi from "../lib/spotify";

function useSpotify() {
  const { data: session }: any = useSession();
  useEffect(() => {
    if (session) {
      if (session.error) {
        signIn();
      }
      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);
  return spotifyApi;
}

export default useSpotify;
