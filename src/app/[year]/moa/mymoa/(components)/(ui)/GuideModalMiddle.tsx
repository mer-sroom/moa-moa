"use client"
import { useState } from "react";
import my_moa from '/public/assets/service-imgs/guide/my_moa.png';
import friend_moa from '/public/assets/service-imgs/guide/friend_moa.png';
import dynamic from 'next/dynamic';

export default function GuideModalMiddle({ owner }: { owner: boolean }) {
    const [isOpen, setIsOpen] = useState(true);
    const onClose = () => setIsOpen(false);
    const GuideModalMiddle = dynamic(() =>
        import('@/app/[year]/(components)/common/GuideModal'), {
        ssr: false,
    });
    if (owner === true) return (
        <GuideModalMiddle isOpen={isOpen} img={my_moa} onClose={onClose} />)
    if (owner === false) return (
        <GuideModalMiddle isOpen={isOpen} img={friend_moa} onClose={onClose} />)
}