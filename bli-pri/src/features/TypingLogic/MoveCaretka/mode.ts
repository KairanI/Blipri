import { controllerText, transfer } from "../../../shared/lib/constant";

let controllerCaretka = true;

export const MoveCaretka = (mode: string | undefined, position: number) => {
  const caretka: HTMLElement | null = document.getElementById('caretka');
  const testText: DOMRect | undefined = document.getElementById('test-text')?.getBoundingClientRect();
  const coordinats: DOMRect | undefined = document.getElementById(`${position}`)?.getBoundingClientRect();

  if (caretka && mode == "words") {
    const nextCoordinats: DOMRect | undefined = document.getElementById(`${position + 1}`)?.getBoundingClientRect();

    if (coordinats && testText) {
      caretka.style.left = `${coordinats.left - testText.left + 1}px`;
      caretka.style.top = `${coordinats.top - testText.top}px`;
      if (nextCoordinats && coordinats.top < nextCoordinats.top) {
        if (controllerText.deleteText == 0) controllerText.endPoint = position;
        controllerText.req = true;
      }
    }
  }

  else if (mode == "zen" || mode == "dictation") {
    if (caretka) {
      const сoordinatZen = document.getElementById(`${position - 1}`)?.getBoundingClientRect();
      if (сoordinatZen && testText) {
        controllerCaretka = true;
        caretka.style.left = `${сoordinatZen.left - testText.left + 21}px`;
        caretka.style.top = `${сoordinatZen.top - testText.top}px`;

        if (controllerText.deleteText == 0) {
          if (position == transfer.length) {
            controllerText.req = true;
            controllerText.endPoint = position;
          }
        }

        else if (controllerText.deleteText > 0) {
          if (position - controllerText.startPoint - 1 == transfer.length) {
            controllerText.req = true;
            controllerText.endPoint = position;
          }
        }
      }
      else if (controllerCaretka) {
        if (testText) {
          caretka.style.left = `0px`;
          caretka.style.top = `13px`;
          controllerCaretka = false;
        }
      }
    }
  }
}