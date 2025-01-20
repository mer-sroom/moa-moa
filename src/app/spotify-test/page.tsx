"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";

interface TrackItem {
  id: string;
  name: string;
  artists: { name: string }[];
  preview_url: string | null;
  external_urls: { spotify: string };
  album: {
    images: { url: string; width: number; height: number }[];
  };
}

/** 검색 → 결과 중 선택 → 미리듣기 */
export default function SpotifyTestPage() {
  const { data: session, status } = useSession();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TrackItem[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<TrackItem | null>(null);
  const [error, setError] = useState<string | null>(null); // 오류 상태 추가
  const [loading, setLoading] = useState(false);

  /** 검색 요청 */
  async function handleSearch() {
    if (!query.trim()) return;
    setError(null); // 이전 오류 초기화
    setLoading(true);
    try {
      const res = await fetch(
        `/api/spotify/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setSearchResults(data);
      } else {
        console.error("Search response error:", data);
        setError(data.error || "검색 중 오류가 발생했습니다.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  /** 곡 선택 (상세 재조회하거나, 여기서는 바로 preview_url 사용) */
  async function handleSelectTrack(track: TrackItem) {
    setError(null); // 이전 오류 초기화
    // preview_url이 이미 있다면 바로 setSelectedTrack
    if (track.preview_url) {
      setSelectedTrack(track);
      return;
    }

    // 트랙 상세를 다시 조회해서 확실한 preview_url 받기
    try {
      const res = await fetch(`/api/spotify/tracks?id=${track.id}`);
      const data = await res.json();
      if (data.error) {
        console.error("Fetch track detail error:", data);
        setError(data.error);
      } else {
        setSelectedTrack(data);
      }
    } catch (err) {
      console.error("Fetch track detail error:", err);
      setError("트랙 상세 정보를 가져오는 중 오류가 발생했습니다.");
    }
  }

  if (status === "loading") {
    return <p>로딩 중...</p>;
  }

  if (!session) {
    return (
      <div style={{ padding: 20 }}>
        <p>로그인이 필요합니다.</p>
        <button onClick={() => signIn("spotify")}>Spotify로 로그인</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Spotify 검색 & 미리듣기 테스트</h1>

      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          value={query}
          placeholder="검색어를 입력하세요"
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "검색 중..." : "검색"}
        </button>
      </div>

      {/* 오류 메시지 표시 */}
      {error && (
        <div style={{ color: "red", marginBottom: 10 }}>
          <p>{error}</p>
        </div>
      )}

      {/* 검색 결과 목록 */}
      <ul>
        {searchResults.map(track => {
          const artistNames = track.artists.map(a => a.name).join(", ");
          const coverUrl = track.album.images?.[0]?.url;
          return (
            <li
              key={track.id}
              style={{
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
              }}
            >
              {coverUrl && (
                <Image
                  src={coverUrl}
                  alt={track.name}
                  width={50}
                  height={50}
                  style={{
                    objectFit: "cover",
                    marginRight: 10,
                    borderRadius: 4,
                  }}
                />
              )}
              <span style={{ marginRight: 10 }}>
                {track.name} - {artistNames}
              </span>
              <button onClick={() => handleSelectTrack(track)}>미리듣기</button>
            </li>
          );
        })}
      </ul>

      {/* 선택된 곡 미리듣기 */}
      {selectedTrack && (
        <div style={{ marginTop: 20 }}>
          <h2>선택된 곡: {selectedTrack.name}</h2>
          {selectedTrack.preview_url ? (
            <audio controls>
              <source src={selectedTrack.preview_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <div>
              <p>
                미리듣기 없음. Spotify 플레이어로 재생하려면 아래를 클릭하세요:
              </p>
              {selectedTrack.external_urls.spotify && (
                <iframe
                  src={`https://open.spotify.com/embed/track/${selectedTrack.id}`}
                  width="300"
                  height="80"
                  frameBorder="0"
                  allow="encrypted-media"
                  style={{ borderRadius: 8 }} // 추가적인 스타일링 예시
                ></iframe>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
