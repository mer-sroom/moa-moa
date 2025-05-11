import styles from "@/styles/SelectModal.module.css";
import Button from "../../(components)/common/Button";

export default function SelectModal({ onClose }: { onClose: () => void }) {
    return (
        <div className={styles.selectModal_container}>
            <div className={styles.selectModal_main}>
                <div className={styles.selectModal_box}>
                    <input type="text"
                    placeholder="선택한 친구 목록"
                    className={styles.input}/>
                    <p className={styles.middle_p}>초대 가능한 친구</p>
                    <div className={styles.bottom_tag}>
                        <p className={styles.selectModal_close} onClick={onClose}>
                            닫기
                        </p>
                        <p className={styles.selectModal_select}>
                            선택 완료
                        </p>
                    </div>
                    <div className={styles.selectModal_select_button}>
                        <Button label="선택완료" size="modalBtn" color="black"></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}