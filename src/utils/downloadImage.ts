import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

export interface CaptureOptions {
  fileName?: string; // 파일명 (확장자 제외, 기본값: "capture")
  format?: "png" | "jpeg"; // 이미지 포맷, 기본값: "png"
  excludeSelector?: string; // 캡쳐 시 제외할 CSS 선택자 (예: ".exclude")
  clip?: {
    x: number;
    y: number;
    width: number;
    height: number;
  }; // 캡쳐할 영역 지정 옵션 (clip)
}

/**
 * 지정된 HTMLElement 영역을 캡쳐하여 이미지 파일로 다운로드합니다.
 * @param element 캡쳐할 요소 (HTML Element)
 * @param options 캡쳐 옵션
 */
export async function captureAndDownload(
  element: HTMLElement,
  options?: CaptureOptions
): Promise<void> {
  const {
    fileName = "moaBox_capture", //기본 파일명
    format = "png",
    excludeSelector,
    clip,
  } = options || {};

  // excludeSelector가 지정되면, 해당 선택자에 해당하는 요소를 캡쳐 대상에서 제외합니다.
  const filter = excludeSelector
    ? (node: Node) => {
        if (node instanceof HTMLElement) {
          return !node.matches(excludeSelector);
        }
        return true;
      }
    : undefined;

  //캡쳐할 영역을 지정할 경우
  const ImageCaptureOptions = {
    filter,
    cacheBust: true,
    ...clip,
  };

  try {
    let dataUrl: string;
    if (format === "png") {
      dataUrl = await htmlToImage.toPng(element, ImageCaptureOptions);
    } else if (format === "jpeg") {
      dataUrl = await htmlToImage.toJpeg(element, ImageCaptureOptions);
    } else {
      throw new Error("지원하지 않는 포맷입니다.");
    }
    // 다운로드를 위한 파일명과 포맷 지정
    saveAs(dataUrl, `${fileName}.${format}`);
  } catch (error) {
    console.error("이미지 캡쳐 중 오류 발생:", error);
    throw error;
  }
}
