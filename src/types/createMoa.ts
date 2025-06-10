export interface DotNavProps {
  colors: string[]; // 색 배열
  onClick: (index: number) => void; // 클릭 이벤트
}

export interface ToggleLabelProps {
  label: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
}

export interface NextStepProps {
  nextStep: () => void;
  goSelectMoa?: () => void;
}

export type ServerType = {
  id: string;
  name: string;
  nickname: string;
  profileImage: string;
  moaBoxOngoing: boolean;
  selected?: boolean;
};
