"use client"
import { useState } from "react";
import GuideModal from "@/app/[year]/(components)/common/GuideModal";
import my_moa from '/public/assets/service-imgs/guide/my_moa.png';
import friend_moa from '/public/assets/service-imgs/guide/friend_moa.png';

export default function GuideModalMiddle({ owner }: { owner: boolean }) {
    const [isOpen, setIsOpen] = useState(true);
    const onClose = () => setIsOpen(false);
    if (owner === true) return (
        <GuideModal isOpen={isOpen} img={my_moa} onClose={onClose} />)
    if (owner === false) return (
        <GuideModal isOpen={isOpen} img={friend_moa} onClose={onClose} />)
}