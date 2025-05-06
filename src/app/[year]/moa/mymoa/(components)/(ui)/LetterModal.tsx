import Image from "next/image";
// 타입, 부속 컴포넌트 --------------------------------------------------------
import type { Letter } from "@/types/moabox";
import { defaultOverlayStyle } from "@/app/[year]/(components)/common/Modal";
import SpotifyAndDownloadBtn from "../(features)/(letter-features)/SpotifyAndDownloadBtn";
//이미지, css ----------------------------------------------------------------
import deleteBtn from "@/../../public/assets/icons/trash_can_icon.svg";
import styles from "@/styles/LetterModal.module.css";
import HandleDeleteLetter from "../(features)/(letter-features)/HandleDeleteLetter";

interface LetterModalProps {
  isOpen: boolean;
  letter: Letter;
  onClose: () => void;
}

export default function LetterModal(props: LetterModalProps) {
  const { isOpen, letter, onClose } = props;
  // const spotifyData = letter.trackId? await fetchSpotifyData(letter.trackId) : null;
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div style={defaultOverlayStyle} onClick={onClose}></div>
      <section id="captureLetterArea" className={styles.modalContainer}>
        <div>
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
              {/* 편지 타이틀 */}
              <h4 id="modalTitle" className={styles.letterTitle}>
                {letter.title}
              </h4>
              {/* 편지 내용 */}
              <p className={styles.letterContent}>{letter.content}</p>
            </div>
            {/* 편지 보낸 이 */}
            <p className={styles.letterSender}>from. {letter.authorName}</p>
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
        {/* 스포티파이와 다운로드 버튼 영역 */}
        <SpotifyAndDownloadBtn
          trackId={letter.trackId}
          authorName={letter.authorName}
        />
      </section>
    </>
  );
}
