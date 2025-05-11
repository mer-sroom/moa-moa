import styles from "@/styles/SelectModal.module.css";

export default function SelectModal({ onClose }: { onClose: () => void }) {
    return (
        <div className={styles.selectModal_container}>
            <div>
                <p>이곳은 오버레이입니다.</p>
                <button className="#" onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    )
}