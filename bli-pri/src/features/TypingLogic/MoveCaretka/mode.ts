import { controllerText, transfer } from "../../../shared/lib/constant";

export const MoveCaretka = (mode: string | undefined, position: number) => {
	const caretka: HTMLElement | null = document.getElementById('caretka');

    if (caretka && mode == "words") {
      const coordinats: DOMRect | undefined = document.getElementById(`${position}`)?.getBoundingClientRect();
      const nextCoordinats: DOMRect | undefined = document.getElementById(`${position + 1}`)?.getBoundingClientRect();

      if (coordinats) {
        caretka.style.left = `${coordinats.left}px`;
        caretka.style.top = `${coordinats.top + 34}px`;
        if (nextCoordinats && coordinats.top < nextCoordinats.top) {
          if (controllerText.deleteText == 0) controllerText.endPoint = position;
          controllerText.req = true;
        }
      }
    }

    else if (mode == "zen" || mode == "dictation") {
      if (caretka) {
        const сoordinats = document.getElementById(`${position - 1}`)?.getBoundingClientRect();
        if (сoordinats) {
          caretka.style.left = `${сoordinats.left + 20}px`;
          caretka.style.top = `${сoordinats.top + 34}px`;

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
      }
    }
}