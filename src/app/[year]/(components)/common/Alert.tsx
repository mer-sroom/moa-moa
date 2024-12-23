"use client";
// 나중에 Alert 라이브러리 쓸건지 말건지 정해야할듯

/**
 * Alert 컴포넌트에 사용할 props 정의
 */
export interface AlertProps {
  /**
   * Alert에 표시될 메시지(문자열 또는 ReactNode 가능)
   */
  message: string | React.ReactNode;
  /**
   * Alert의 유형('success', 'info', 'warning', 'error' 등)
   */
  type?: "success" | "info" | "warning" | "error";
  /**
   * Alert를 표시할지 여부 (true면 표시, false면 숨김)
   */
  isOpen?: boolean;
  /**
   * Alert 닫기 버튼 클릭 시 호출될 함수
   */
  onClose?: () => void;
}

export default function Alert({
  message,
  type = "info",
  isOpen = true,
  onClose,
}: AlertProps) {
  // isOpen이 false이면 Alert 표시 안 함
  if (!isOpen) return null;

  // Alert 유형에 따른 간단한 배경색 설정
  const alertStyle = {
    backgroundColor:
      type === "success"
        ? "lightgreen"
        : type === "warning"
        ? "yellow"
        : type === "error"
        ? "pink"
        : "lightblue",
    border: "1px solid gray",
    padding: "8px",
    margin: "8px 0",
    position: "relative" as const,
  };

  return (
    <div style={alertStyle}>
      <div>{message}</div>
      {onClose && (
        <button
          style={{ position: "absolute", top: "4px", right: "4px" }}
          onClick={onClose}
        >
          Close
        </button>
      )}
    </div>
  );
}
