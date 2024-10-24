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
        const spaceCoordinats = document.getElementById(`${position}`)?.getBoundingClientRect();
        const nextCoordinats = document.getElementById(`${position + 1}`)?.getBoundingClientRect();
        if (spaceCoordinats) {
          caretka.style.left = `${spaceCoordinats.left}px`;
          caretka.style.top = `${spaceCoordinats.top + 34}px`;

          if (spaceCoordinats && nextCoordinats && spaceCoordinats.top < nextCoordinats.top) {
            transfer.controller += 1;
            if (transfer.controller == 2) {
              if (controllerText.deleteText == 0) controllerText.endPoint = position;
              controllerText.req = true;
              transfer.controller = 0;
            }
          }
        }
      }
    }
}