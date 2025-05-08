export interface DotNavProps {
    color1: string;
    color2: string;
    color3: string;
    color4?: string;
}

export interface ToggleLabelProps {
    label: string;
}

export interface NextStepProps {
    nextStep: () => void;
    goSelectMoa?: () => void;
  }