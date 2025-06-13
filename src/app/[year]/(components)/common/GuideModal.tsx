"use client";
import type { CSSProperties } from "react";
import { useMediaQuery } from "react-responsive";
import Image, { StaticImageData } from 'next/image';
import x_btn from "/public/assets/icons/modal_X_btn.svg";
import styles from "../../../../styles/modal.module.css";

export const overlayStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
};

export default function GuideModal({
    isOpen, onClose, img,
}: {
    isOpen?: boolean;
    onClose?: () => void;
    img?: string | StaticImageData;
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
        zIndex: 2,
        boxShadow: "0px 0px 0px 4px var(--ui-neutral) inset",
        flexDirection: "column",
        backgroundColor: "var(--ui-secondary)",
        borderRadius: "20px",
        overflow: "hidden",
    };

    if (!isOpen) return null;
    return (
        <div style={{ ...overlayStyle }}>
            <div style={{ ...modalStyle }}>
                <Image
                    style={{ ...contentStyle }}
                    src={img}
                    alt="img"
                    sizes="100vw"
                />
                <Image
                    src={x_btn}
                    alt="close"
                    onClick={onClose}
                    className={styles.X_btn}
                />
            </div>
        </div>
    )
}