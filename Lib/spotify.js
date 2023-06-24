import SpotifyWebApi from "spotify-web-api-node";

// credentials are optional

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
  "user-top-read",
].join(",");

//join :- it make all the array content i.e scpoes next to each other by comma seperated. All will be 1 string.
//example : "user-read-email,plalist-read-private,..,..,"

//It will end up like parameter for link  https://accounts.spotify.com/authorize?params=user-read-email&streaming...
const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;
export { LOGIN_URL };
