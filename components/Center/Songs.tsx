import { useRecoilState, useRecoilValue } from "recoil";
import { Items, playlistState } from "../../atoms/playlistAtom";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import spotifyApi from "../../lib/spotify";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = (id: string, uri: string) => {
    setCurrentTrackId(id);
    setIsPlaying(true);
    // spotifyApi.play({
    //   //   uris: uri,
    // });
  };
  function getMinutesAndSeconds(millis: number) {
    const minutes = Math.floor(millis / 60000);
    const seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return seconds === 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {playlist?.tracks.items.map((song: Items, i: number) => (
        <div
          key={song.track?.id}
          className="grid grid-cols-2 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
          onClick={() => playSong(song.track?.id, song.track.uri)}
        >
          <div className="flex items-center space-x-4">
            <p>{i + 1}</p>
            <img
              className="h-10 w-10"
              src={song.track?.album.images?.[0].url}
              alt=""
            />
            <div>
              <p className="w-36 lg:w-64 truncate">{song.track?.name}</p>
              <p className="w-40">{song.track?.artists[0].name}</p>
            </div>
          </div>
          <div className="flex items-center justify-between ml-auto md:ml-0">
            <p className="w-40 hidden md:inline">{song.track?.album.name}</p>
            <p>{getMinutesAndSeconds(song.track?.duration_ms)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Songs;
