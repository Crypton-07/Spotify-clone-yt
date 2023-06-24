import React, { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  PlusCircleIcon,
  RssIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atom/playlistAtom";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  // console.log(session);
  const [Playlists, setPlaylists] = useState([]);
  const [Playlistid, setPlaylistsid] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  console.log("You selected this playlists", Playlistid);
  // songs playlists

  // useEffect(() => {
  //   if (session?.error === "RefreshAccessTokenError") {
  //     signIn(); // Force sign in to hopefully resolve error
  //   }
  // }, [session]);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="w-5 h-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <BuildingLibraryIcon className="w-5 h-5" />
          <p>Your Library</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <MagnifyingGlassIcon className="w-5 h-5" />
          <p>Search</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />
        {/* here we can give custom value in tailwind css */}

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="w-5 h-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="w-5 h-5 text-blue-500" />
          <p> Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="w-5 h-5 text-green-500" />
          <p>Your Episodes</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />
        {/* here we can give custom value in tailwind css */}
        {Playlists.map((Playlist,index) => (
          <p
            key={index}
            onClick={() =>
              setPlaylistsid(Playlist.id)
            }
            className="cursor-pointer hover:text-white"
          >
            {Playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
