import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

/**
 * @param element 캡쳐를 시작할 루트 DOM 요소
 * @param options 캡쳐 동작 제어하는 설정 객체(제외할 요소, 파일명, 포맷, 크롭 영역 등)
 */

//캡쳐 옵션 타입
export interface CaptureOptions {
  fileName?: string; // 파일명
  format?: "png" | "jpeg"; // 이미지 포맷, 기본값 png
  excludeSelector?: string | string[]; // 캡쳐 시 제외할 클래스명 (ex: ".btnSection")
}

export async function captureAndDownload(
  element: HTMLElement,
  options?: CaptureOptions
) {
  const {
    fileName = "moaBox_capture", //기본 파일명
    format = "png",
    excludeSelector,
  } = options;

  //캡쳐 제외할 영역
  const selector = Array.isArray(excludeSelector)
    ? excludeSelector.join(",") //배열로 받았다면 쉼표로 합치기기
    : excludeSelector;

  // filter 함수
  // 모든 자식 요소에 해당 함수 실행, selector에 있다면(false) 제외, 아닐 시(true) 캡쳐
  const filter = selector
    ? (area: Node) => {
        //선택된 영역이 HTML요소가 맞고, excludeArea에 해당되는지
        if (area instanceof HTMLElement && area.matches(selector)) {
          return false; //캡쳐에서 제외
        }
        return true; //캡쳐에 포함
      }
    : undefined; //애초에 excludeArea가 없다면 undefined

  const captureHeight = element.clientHeight - 100; // 하단 100px만큼 잘라냄

  //cloneNode에 적용할 스타일 리셋
  const styleOverrides = {
    transform: "none", //캡쳐시 잘리는 걸 방지하기 위해 원래 css 일시 제거
    position: "static", //position값 초기화
  };

  try {
    let dataUrl: string;
    //최종적으로 넘길 이미지 캡쳐 옵션들
    const ImageCaptureOptions = {
      filter, //지정한 값이 있다면 특정 영역, 없다면 undefined
      cacheBust: true, //이미지 새로고침(캐시 방지)
      height: captureHeight,
      style: styleOverrides, //스타일 오버라이드
    };

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
