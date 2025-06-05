"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/MusicSelect.module.css";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";

// 트랙 정보 인터페이스 정의
interface TrackItem {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string; width: number; height: number }[];
  };
}

// 개별 곡 아이템 Props 정의
interface MusicItemProps {
  check: (id: string) => void;
  state: boolean;
  id: string;
  name: string;
  artist: string;
  imgUrl: string;
}

// 곡 항목 렌더링 컴포넌트
const MusicList = ({
  check,
  state,
  id,
  name,
  artist,
  imgUrl,
}: MusicItemProps) => {
  return (
    <div
      className={styles.music_item}
      style={{ backgroundColor: state ? "#000" : undefined }}
      onClick={() => check(id)}
    >
      <img src={imgUrl} alt="cover" className={styles.profile_image} />
      <div className={styles.music_text_box}>
        <div
          className={styles.song_title}
          style={{
            color: state ? "#fff" : undefined,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {name}
        </div>
        <div
          className={styles.artist_name}
          style={{
            color: state ? "#fff" : undefined,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {artist}
        </div>
      </div>
      <div
        className={styles.check_icon}
        style={{ color: state ? "#fff" : "#b9b9b9" }}
      >
        {state ? <FaRegCircleCheck size={24} /> : <FaRegCircle size={24} />}
      </div>
    </div>
  );
};

export default function MusicSelect() {
  const [selected, setSelected] = useState<string | null>(null); // 단일 선택으로 변경
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TrackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 하나만 선택하도록 제한
  const handleCheck = (id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      fetchSpotify();
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);

  async function fetchSpotify() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(
        `/api/spotify/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setError(data.error || "검색 오류 발생");
      }
    } catch (e) {
      console.error(e);
      setError("검색 요청 실패");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.music_container}>
      <div className={styles.music_container_text}>
        {/* 검색 */}
        <div className={styles.music_search_input}>
          <input
            type="text"
            placeholder="노래 제목 검색하기"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* 검색 결과 */}
        <div className={styles.music_search_result}>
          {loading && <div>검색 중...</div>}
          {error && <div style={{ color: "red" }}>{error}</div>}
          {!loading &&
            results.map((track) => (
              <MusicList
                key={track.id}
                id={track.id}
                check={handleCheck}
                state={selected === track.id}
                name={track.name}
                artist={track.artists.map((a) => a.name).join(", ")}
                imgUrl={track.album.images?.[0]?.url || "/assets/icons/cat.svg"}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
