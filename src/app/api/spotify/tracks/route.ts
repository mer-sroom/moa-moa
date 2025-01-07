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
 * 처음엔 null → 아직 토큰 발급 안 된 상태
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
    throw error; // 라우트에서 잡거나, 상위에서 다시 핸들링
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
 * GET /api/spotify/tracks?id=...
 * 클라이언트 크리덴셜(앱 자격 증명) 방식으로 토큰을 받아
 * Spotify API에서 트랙 정보를 가져온다.
 */
export async function GET(req: Request) {
  try {
    console.log("[DEBUG] GET /api/spotify/tracks called");
    const { searchParams } = new URL(req.url);
    const trackId = searchParams.get("id");
    if (!trackId) {
      return NextResponse.json({ error: "Missing track ID" }, { status: 400 });
    }

    // 1) 토큰이 필요한 경우 발급 혹은 재발급
    await ensureAccessToken();

    // 2) Spotify API로 트랙 정보 가져오기
    const data = await spotifyApi.getTrack(trackId, { market: "SE" });

    // 3) 디버깅용 콘솔 - 트랙 데이터를 JSON 문자열로 직렬화하여 출력
    console.log("[DEBUG] track data:", JSON.stringify(data.body, null, 2));

    // 4) preview_url, name, artists, external_urls, album 등만 추려서 응답
    const { preview_url, name, artists, external_urls, album } = data.body;

    return NextResponse.json({
      id: trackId,
      name: name,
      artists: artists?.map(a => ({ name: a.name })),
      previewUrl: preview_url,
      externalUrl: external_urls?.spotify || "",
      album: {
        images: album.images,
      },
    });
  } catch (error: unknown) {
    console.error("[ERROR] /api/spotify/tracks GET:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
