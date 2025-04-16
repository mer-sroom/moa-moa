import { Suspense } from "react";
import Image from "next/image";
// 타입, 부속 컴포넌트 --------------------------------------------------------
import type { Letter } from "@/types/moabox";
import { defaultOverlayStyle } from "@/app/[year]/(components)/common/Modal";
import Skeleton from "@/app/[year]/(components)/common/Skeleton";
import SpotifyWithDelay from "../(ui)/SpotifyWithDelay";
import LetterDownloadImageBtn from "../(features)/LetterDownloadImageBtn";
//이미지, css ----------------------------------------------------------------
import deleteBtn from "@/../../public/assets/icons/trash_can_icon.svg";
import styles from "@/styles/LetterModal.module.css";
import HandleDeleteLetter from "../(features)/HandleDeleteLetter";

interface LetterModalProps {
  isOpen: boolean;
  letter: Letter;
  onClose: () => void;
}

export default function LetterModal(props: LetterModalProps) {
  const { isOpen, letter, onClose } = props;
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div style={defaultOverlayStyle} onClick={onClose}></div>
      <section className={styles.modalContainer}>
        <div id="captureLetterArea">
          {/* 편지 아이콘 */}
          <div
            className={styles.letterIcon}
            style={{
              backgroundImage: `url(${letter.letterIconDesign.imageURL})`,
            }}
          />
          {/* 편지 본문 */}
          <div
            className={styles.letterPaper}
            style={{
              backgroundImage: `url(${letter.letterPaperDesign.imageURL})`,
            }}
          >
            <div className={styles.letterContentContainer}>
              <h4 id="modalTitle" className={styles.letterTitle}>
                {letter.title}
              </h4>
              <p className={styles.letterContent}>{letter.content}</p>
              <p className={styles.letterSender}>from. {letter.authorName}</p>
            </div>
            {/* 편지 삭제 버튼 */}
            <div className={styles.deleteButtonContainer}>
              <HandleDeleteLetter letterId={letter.id}>
                <button className={styles.deleteButton}>
                  <Image
                    src={deleteBtn}
                    alt="delete letter button"
                    width={24}
                    height={24}
                  />
                </button>
              </HandleDeleteLetter>
            </div>
          </div>
        </div>
        {/* 스포티파이 */}
        {letter.trackId && (
          <div className={styles.spotifyContainer}>
            <Suspense fallback={<Skeleton width="100%" height="80px" />}>
              <SpotifyWithDelay trackId={letter.trackId} delay={800} />
            </Suspense>
          </div>
        )}
        {/* 저장하기 버튼 */}
        <LetterDownloadImageBtn />
      </section>
    </>
  );
}
