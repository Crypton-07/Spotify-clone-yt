import React from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../atom/playlistAtom";
import Song from "./Song"

function Songs() {

const playList = useRecoilValue(playlistState);
console.log(playList);

  return (
    <div className="px-8 flex flex-col space-y-1 text-white">
      {playList?.tracks?.items.map((track,i)=>(
        <Song key={i} track = {track} order = {i} />
      ))}
    </div>
  );
}

export default Songs;
