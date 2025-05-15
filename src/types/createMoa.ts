export interface DotNavProps {
  colors: string[]; // 색 배열
  onClick: (index: number) => void; // 클릭 이벤트
}

export interface ToggleLabelProps {
    label: string;
}

export interface NextStepProps {
    nextStep: () => void;
    goSelectMoa?: () => void;
}
