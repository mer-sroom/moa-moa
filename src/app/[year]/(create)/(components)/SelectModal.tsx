import styles from "@/styles/SelectModal.module.css";
import Button from "../../(components)/common/Button";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";


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

type MemberType = {
    name: string;
    selected: boolean;
};

export default function SelectModal({
    onClose, onMemberChange
}: {
    onClose: () => void,
    onMemberChange: (data: string[]) => void
}) {

    const [ischeck, setisCheck] = useState(false);
    const [member, setMember] = useState<string[]>([]);

    //임시데이터
    const [friend, setFriend] = useState<MemberType[]>([
        { name: "머가문", selected: false },
        { name: "멈가문", selected: false },
        { name: "현가문", selected: false },
    ]);

    useEffect(() => {
        const booleanCheck = friend.filter((friend) => friend.selected).length;
        if (booleanCheck === 0) {
            setisCheck(false);
        } else {
            setisCheck(true);
        }
    }, [friend]);

    useEffect(() => {
        const onDateChange = friend.filter((friend) => friend.selected)
            .map((friend) => friend.name);
        setMember(onDateChange);
    }
        , [friend]);

    // ["머가문", "멈가문", "현가문"] 의 boolean 값 상태체크
    const check = (name_: string) =>
        setFriend((prev) =>
            prev.map((friend) =>
                friend.name === name_
                    ? { ...friend, selected: !friend.selected }
                    : friend
            )
        );

    //친구선택 목록에서 x버튼으로 이름 빼기
    const removeMember = (remove: string) => {
        setMember(prevMember => prevMember.filter((memberName, idx) => memberName !== remove));
    };

    return (
        <div className={styles.selectModal_container}>
            <div className={styles.selectModal_main}>
                <div className={styles.selectModal_box}>
                    <div className={styles.input}>
                        {ischeck ?
                            <>{member.map((member, id) => (
                                <p key={id}>
                                    {member}
                                    <IoMdClose
                                        className={styles.close_icon}
                                        size="20px"
                                        onClick={() => removeMember(member)} />
                                </p>
                            ))}</>
                            :
                            <p className={styles.placeholder}>선택한 친구 목록</p>}
                    </div>
                    <div className={styles.middle}>
                        <p>초대 가능한 친구</p>
                        {friend.map((name) => (
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
                        <p className={styles.selectModal_close} onClick={onClose}>
                            닫기
                        </p>
                        {ischeck ?
                            <div
                                className={styles.selectModal_select_button}
                                onClick={() => { onClose(); onMemberChange(member); }}>
                                <Button label="선택완료" size="modalBtn" color="black"></Button>
                            </div> :
                            <div className={styles.notPointer}>
                                <Button label="선택완료" size="modalBtn" color="none"></Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}