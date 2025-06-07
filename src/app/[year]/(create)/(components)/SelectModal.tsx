import styles from "@/styles/SelectModal.module.css";
import Button from "../../(components)/common/Button";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import type { MemberType } from "@/types/createMoa";  // db 데이터 저장 (임시) 

const List = ({
    check, state, name
}: {
    check: (name: string) => void,
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
                <div className={styles.list_icon} onClick={() => { check(name); }}>
                    {state ?
                        <FaRegCircleCheck color="white" fontSize="30px" /> :
                        <FiPlusCircle color="gray" fontSize="30px" />}
                </div>
            </div>
        </div>
    )
}

export default function SelectModal({
    onClose, onMemberChange, check, removeMember, memberValue, friendData,
}: {
    onClose: () => void,
    onMemberChange: (data: string[]) => void,
    check: (data: string) => void,
    removeMember: (data: string) => void,
    memberValue: MemberType[],
    friendData: string[],
}) {
    const [ischeck, setisCheck] = useState(false);

    // input tag 상태 체크 
    useEffect(() => {
        const booleanCheck = memberValue.filter((friend) => friend.selected).length;
        if (booleanCheck === 0) {
            setisCheck(false);
        } else {
            setisCheck(true);
        }
    }, [memberValue]);

    return (
        <div>
            <div className={styles.selectModal_main}>
                <div className={styles.input}>
                    {ischeck ?
                        <>{friendData.map((name) => (
                            <p key={name}>
                                {name}
                                <IoMdClose
                                    className={styles.close_icon}
                                    size="20px"
                                    onClick={() => removeMember(name)} />
                            </p>
                        ))}</>
                        :
                        <p className={styles.placeholder}>선택한 친구 목록</p>}
                </div>
                <p className={styles.middle_p}>초대 가능한 친구</p>
                <div className={styles.middle}>

                    {memberValue.map((name) => (
                        <div key={name.name} className={styles.middle_list}>
                            <List
                                check={check}
                                state={name.selected}
                                name={name.name}>
                            </List>
                        </div>
                    ))}
                </div>
                <div className={styles.bottom_tag}>
                    {ischeck ?
                        <div
                            className={styles.selectModal_select_button}
                            onClick={() => { onClose(); onMemberChange(friendData); }}>
                            <Button label="선택완료" size="modalBtn" color="black"></Button>
                        </div> : ''}
                </div>
            </div>
        </div>
    )
}