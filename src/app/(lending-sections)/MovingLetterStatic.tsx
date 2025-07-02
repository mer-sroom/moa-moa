// "use client";
// import { useRef /*, useEffect */ } from "react"; // ★ 애니메이션용 useEffect 제거
// import Image from "next/image";
// import {
//   LETTER_KEYFRAMES,
//   DEST_SCROLL,
//   type Keyframe,
// } from "@/app/(lending-sections)/letterKeyframes";

// const clone = (): Keyframe[] => LETTER_KEYFRAMES.map(k => ({ ...k }));

// export default function MovingLetterStatic() {
//   /* --- 기존 계산 로직은 필요 없으므로 통째로 주석 처리 -------------------- */
//   /*
//   const kfsRef = useRef<Keyframe[]>(clone());
//   const divRef = useRef<HTMLDivElement>(null);

//   useEffect(() => { ... });                // ★ 비활성화
//   useEffect(() => { ... });                // ★ 비활성화
//   */

//   /* ----------------------------------------------------------------------- */

//   /* 편지를 고정된 위치에만 렌더 (transform / 스크롤 리스너 X) */
//   return (
//     <div
//       /* 고정 위치(우상단 카드 더미에 맞춰 대략 잡아둡니다) */
//       style={{
//         position: "absolute",
//         top: "35%",
//         right: "8%",
//         transform: "translate(50%, -50%)",
//         zIndex: 50,
//         pointerEvents: "none",
//       }}
//     >
//       <Image
//         src="/assets/icons/lending/letter.svg"
//         alt="Letter"
//         width={548}
//         height={362}
//         priority
//       />
//     </div>
//   );
// }
