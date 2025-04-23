import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

//캡쳐 옵션 타입
export interface CaptureOptions {
  fileName?: string; // 파일명
  format?: "png" | "jpeg"; // 이미지 포맷, 기본값 png
  excludeArea?: string | string[]; // 캡쳐 시 제외할 클래스명 (ex: ".btnSection")
  clip?: {
    x: number;
    y: number;
    width: number;
    height: number;
  }; // 캡쳐할 영역 크롭하고 싶을 때 직접 영역 지정
}

/**
 * @param element 캡쳐를 시작할 루트 DOM 요소
 * @param options 캡쳐 동작 제어하는 설정 객체(제외할 요소, 파일명, 포맷, 크롭 영역 등)
 */
export async function captureAndDownload(
  element: HTMLElement,
  options?: CaptureOptions
) {
  const {
    fileName = "moaBox_capture", //기본 파일명
    format = "png",
    excludeArea,
    clip,
  } = options;

  const selector = Array.isArray(excludeArea)
    ? excludeArea.join(",")
    : excludeArea;

  // 제외할 영역 확인하는 콜백 함수(html-to-image가 모든 자식 요소에 해당 함수 실행)
  //true 리턴값만 캡쳐, false 리턴값은 캡쳐에서 제외
  const filter = selector
    ? (area: Node) => {
        //선택된 영역이 HTML요소가 맞고, excludeArea에 해당되는지
        if (area instanceof HTMLElement && area.matches(selector)) {
          return false; //캡쳐에서 제외
        }
        return true; //캡쳐에 포함
      }
    : undefined; //애초에 excludeArea가 없다면 undefined

  //최종적으로 넘길 이미지 캡쳐 옵션들
  const ImageCaptureOptions = {
    filter, //지정한 값이 있다면 특정 영역, 없다면 undefined
    cacheBust: true, //이미지 새로고침(캐시 방지)
    ...clip, //지정한 영역이 있다면 전달
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
