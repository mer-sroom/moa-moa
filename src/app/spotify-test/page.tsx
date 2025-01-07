"use client";

import React, { useState } from "react";
import Image from "next/image";

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

/** 검색 → 결과 중 선택 → 미리듣기 */
export default function SpotifyTestPage() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TrackItem[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<TrackItem | null>(null);
  const [error, setError] = useState<string | null>(null); // 오류 상태 추가

  /** 검색 요청 */
  async function handleSearch() {
    if (!query.trim()) return;
    setError(null); // 이전 오류 초기화
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
    }
  }

  /** 곡 선택 (상세 재조회하거나, 여기서는 바로 preview_url 사용) */
  async function handleSelectTrack(track: TrackItem) {
    setError(null); // 이전 오류 초기화
    // previewUrl이 이미 있다면 바로 setSelectedTrack
    if (track.previewUrl) {
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
        <button onClick={handleSearch}>검색</button>
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
            <li key={track.id} style={{ marginBottom: 10 }}>
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
          {selectedTrack.previewUrl ? (
            <audio controls>
              <source src={selectedTrack.previewUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <div>
              <p>
                미리듣기 없음. Spotify 플레이어로 재생하려면 아래를 클릭하세요:
              </p>
              {selectedTrack.externalUrl && (
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
