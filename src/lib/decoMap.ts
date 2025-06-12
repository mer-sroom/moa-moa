import { DecorationEnum } from "@/types/moaBoxRequest";
import type { DecorationType } from "@/types/moaBoxRequest"; //

// key 타입을 DecorationType 으로!
export const decoImage: Record<DecorationType, string> = {
  NONE: "",
  STAR: "/assets/icons/create_moa/deco-star.svg",
  HEART: "/assets/icons/create_moa/deco-heart.svg",
  RIBBON: "/assets/icons/create_moa/deco-ribbon.svg",
};
