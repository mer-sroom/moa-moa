"use client";
// 추후에 알러트랑 모달 어떻게 디자인하고, (라이브러리 사용여부 등) 결정해야할 듯요요
export interface AlertProps {
  message: string | React.ReactNode;
  type?: "success" | "info" | "warning" | "error";
  isOpen?: boolean;
  onClose?: () => void;

  // [추가] 스타일 덮어쓰기 위한 props
  alertStyle?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
}

export default function Alert({
  message,
  type = "info",
  isOpen = true,
  onClose,
  alertStyle: customAlertStyle,
  overlayStyle: customOverlayStyle,
}: AlertProps) {
  if (!isOpen) return null;

  // 오버레이(배경) 기본 스타일
  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 9998,
  };

  // Alert 창(팝업) 기본 스타일
  const baseAlertStyle: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor:
      type === "success"
        ? "lightgreen"
        : type === "warning"
        ? "yellow"
        : type === "error"
        ? "pink"
        : "lightblue",
    border: "1px solid gray",
    padding: "16px",
    borderRadius: "8px",
    zIndex: 9999,
    width: "300px",
    textAlign: "center",
  };

  return (
    <>
      {/* 오버레이 */}
      <div
        style={{ ...overlayStyle, ...customOverlayStyle }}
        onClick={onClose}
      />

      {/* Alert 팝업 */}
      <div style={{ ...baseAlertStyle, ...customAlertStyle }}>
        <div style={{ marginBottom: "8px" }}>{message}</div>
        {onClose && (
          <button onClick={onClose} style={{ cursor: "pointer" }}>
            닫기
          </button>
        )}
      </div>
    </>
  );
}
