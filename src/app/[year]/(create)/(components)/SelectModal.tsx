import styles from "@/styles/SelectModal.module.css";
import Button from "../../(components)/common/Button";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useState } from "react";


const List = ({
    check, onDateSend, state, name
}: {
    check: () => void,
    onDateSend: (data: string) => void,
    state: boolean,
    name: string
}) => {
    return (
        <div>
            <div className={`${styles.list_container} ${state ? styles.check : ''}`} >
                <div className={styles.list_circle}>
                </div>
                <div className={`${styles.list_text_box} ${state ? styles.check : ''}`} >
                    <p className={styles.bold}>{name}</p>
                    <p>초대가능</p>
                </div>
                <div className={styles.list_icon} onClick={() => { check(); onDateSend(name); }}>
                    {state ?
                        <FaRegCircleCheck color="white" fontSize="30px" /> :
                        <FiPlusCircle color="gray" fontSize="30px" />}
                </div>
            </div>
        </div>
    )
}

export default function SelectModal({
    onClose, onMemberChange
}: {
    onClose: () => void,
    onMemberChange: (data: string) => void
}) {
    const [ischeck, setisCheck] = useState(false);
    const check = () => setisCheck(!ischeck);

    //임시데이터
    let name = "머가문"
    const [member, setMember] = useState<string>('');

    const onDateChange = (data: string) => {
        setMember(data)
        console.log("setMember 확인")
    };

    return (
        <div className={styles.selectModal_container}>
            <div className={styles.selectModal_main}>
                <div className={styles.selectModal_box}>
                    <input type="text"
                        placeholder="선택한 친구 목록"
                        className={styles.input} value={member} />
                    <div className={styles.middle}>
                        <p>초대 가능한 친구</p>
                        <List check={check} state={ischeck} name={name} onDateSend={onDateChange}></List>
                    </div>
                    <div className={styles.bottom_tag}>
                        <p className={styles.selectModal_close} onClick={onClose}>
                            닫기
                        </p>
                        {ischeck ?
                            <div
                                className={styles.selectModal_select_button}
                                onClick={() => { onClose(); onMemberChange(member); }}>
                                <Button label="선택완료" size="modalBtn" color="black"></Button>
                            </div> :
                            <Button label="선택완료" size="modalBtn" color="none"></Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}