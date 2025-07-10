import type { CSSProperties } from "react";

export default function MusicCard({
    isOpen, }: { isOpen?: boolean; }) {
    const img = '/assets/mock/dummy_music_card.svg'  //목업 이미지

    const cardStyle: CSSProperties = {
        width: "300px",
        height: "70px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundSize: "cover",
        borderRadius: "16px",
        padding: "0px 0 0px 0",
        margin: "20px 0 0 0",
        backgroundImage: `url(${img})`  // 스포티파이 연동으로 대체 필요
    };

    if (!isOpen) return null;
    return (
        <div style={{ ...cardStyle }}></div>
    )
}