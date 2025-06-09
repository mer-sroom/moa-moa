"use client";
import type { CSSProperties } from "react";
import { useMediaQuery } from "react-responsive";
import Image from 'next/image';
import testimg from '@/../public/assets/service-imgs/guide/create_moa_step4.svg';


export const overlayStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
};

export default function GuideModal({
    isOpen, onClose,
}: {
    isOpen?: boolean;
    onClose?: () => void;
}) {
    const isMobile = useMediaQuery({ maxWidth: 600 });
    const isSmallMobile = useMediaQuery({ maxWidth: 390 });

    const contentStyle: CSSProperties = {
        display: "flex",
        inset: "0",
        width: isMobile ? "100%" : "auto",
        height: "100%",
        objectFit: "contain",
    };

    const modalStyle: CSSProperties = {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: isSmallMobile ? "82%" : isMobile ? "85%" : "",
        maxWidth: isMobile ? "90%" : "100%",
        height: isMobile ? "" : "90%",
        maxHeight: isMobile ? "90%" : "",
        transform: "translate(-50%, -50%)",
        padding: "1px 1px",
        zIndex: 2,
        boxShadow: "0px 1px 3px 0px var(--ui-neutral)",
        flexDirection: "column",
        backgroundColor: "var(--ui-secondary)",
        borderRadius: "2px",
        overflow: "hidden",
    };

    if (!isOpen) return null;
    return (
        <div style={{ ...overlayStyle }}>
            <div style={{ ...modalStyle }}>
                <Image
                    style={{ ...contentStyle }}
                    src={testimg}
                    alt="testimg"
                    sizes="100vw"
                />
            </div>
        </div>
    )
}