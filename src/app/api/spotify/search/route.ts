import { NextResponse } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";

/**
 * Client Credential Flow 전용 SpotifyWebApi 인스턴스
 */
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

/**
 * 토큰 만료 시각 (ms 단위)
 */
let tokenExpiresAt: number | null = null;

/**
 * clientCredentialsGrant()로 새 토큰을 발급받고,
 * spotifyApi 인스턴스에 Access Token을 설정
 */
async function getSpotifyToken() {
  console.log("[DEBUG] getSpotifyToken() called");
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    const accessToken = data.body["access_token"];
    const expiresInSec = data.body["expires_in"]; // 보통 3600초 (1시간)

    // 발급받은 토큰을 설정
    spotifyApi.setAccessToken(accessToken);

    // 현재 시각 + expiresIn(초) → 만료 시각 계산
    // 여유있게 1분 정도 빼서 안전마진 확보
    tokenExpiresAt = Date.now() + expiresInSec * 1000 - 60_000;
    console.log("[DEBUG] New token set:", accessToken.slice(0, 10) + "...");
    console.log("[DEBUG] Token expires at:", new Date(tokenExpiresAt));
  } catch (error) {
    console.error(
      "[ERROR] Failed to get Spotify Token via clientCredentialsGrant:",
      error
    );
    throw error;
  }
}

/**
 * 토큰이 없거나 이미 만료되었다면 새로 발급
 */
async function ensureAccessToken() {
  const currentToken = spotifyApi.getAccessToken();
  const now = Date.now();

  if (!currentToken || (tokenExpiresAt && now > tokenExpiresAt)) {
    console.log("[DEBUG] No token or token expired → getSpotifyToken()");
    await getSpotifyToken();
  }
}

/**
 * GET /api/spotify/search?q=...
 * Spotify 검색 API를 호출하여 트랙 검색 결과를 반환
 */
export async function GET(req: Request) {
  try {
    console.log("[DEBUG] GET /api/spotify/search called");
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    if (!query) {
      return NextResponse.json(
        { error: "Missing search query" },
        { status: 400 }
      );
    }

    // 토큰 발급 또는 재발급
    await ensureAccessToken();

    // Spotify 검색 API 호출
    const data = await spotifyApi.searchTracks(query, {
      limit: 10,
      market: "SE",
    });

    // 검색 결과 가공
    const tracks: TrackItem[] =
      data.body.tracks?.items.map(track => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map(artist => ({ name: artist.name })),
        previewUrl: track.preview_url,
        externalUrl: track.external_urls.spotify,
        album: {
          images: track.album.images,
        },
      })) || [];

    // 디버깅용 콘솔
    console.log("[DEBUG] search results:", JSON.stringify(tracks, null, 2));

    return NextResponse.json(tracks);
  } catch (error: any) {
    console.error("[ERROR] /api/spotify/search GET:", error);
    return NextResponse.json(
      { error: error.message || "Failed to search tracks" },
      { status: 500 }
    );
  }
}

interface TrackItem {
  id: string;
  name: string;
  artists: { name: string }[];
  previewUrl: string | null;
  externalUrl: string;
  album: {
    images: { url: string; width: number; height: number }[];
  };
}
