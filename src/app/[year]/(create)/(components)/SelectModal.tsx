import styles from "@/styles/SelectModal.module.css";
import Button from "../../(components)/common/Button";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useState } from "react";

const List = ({ check, state }: { check: () => void, state: boolean }) => {
    return (
        <div>
            <div className={`${styles.list_container} ${state ? styles.check : ''}`} >
                <div className={styles.list_circle}>
                </div>
                <div className={`${styles.list_text_box} ${state ? styles.check : ''}`} >
                    <p>머가문</p>
                    <p>초대가능</p>
                </div>
                <div className={styles.list_icon} onClick={check}>
                    {state ? <FaRegCircleCheck color="white" fontSize="30px" /> : <FiPlusCircle color="gray" fontSize="30px" />}
                </div>
            </div>
        </div>
    )
}

export default function SelectModal({ onClose }: { onClose: () => void }) {
    const [ischeck, setisCheck] = useState(false);
    const check = () => setisCheck(!ischeck);

    return (
        <div className={styles.selectModal_container}>
            <div className={styles.selectModal_main}>
                <div className={styles.selectModal_box}>
                    <input type="text"
                        placeholder="선택한 친구 목록"
                        className={styles.input} />
                    <div className={styles.middle}>
                        <p>초대 가능한 친구</p>
                        <List check={check} state={ischeck}></List>
                    </div>
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