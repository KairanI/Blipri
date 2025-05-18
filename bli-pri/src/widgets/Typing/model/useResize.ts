import { controllerText, transfer } from "../../../shared/lib/constant";
import { useEffect } from "react";
import { TypeUseResize } from "../lib/config";
import { adaptiveLength } from "./adaptivLength";
import { useActions } from '../../../shared/hooks/useActions'

export const useResize: TypeUseResize = ({ setType, setPosition }) => {
  const { editIsPad, editIsMobile } = useActions();

	useEffect(() => {
    const wordsCount: HTMLElement | null = document.getElementById('wordsCount');
    
    if (wordsCount) {
      if (window.innerWidth <= 760) wordsCount.style.bottom = `120px`;
      else wordsCount.style.bottom = `130px`;
    };

    const testTextTimeout: HTMLElement | null = document.getElementById('test-text');
    transfer.length = Math.floor(testTextTimeout!.clientWidth / 19);

		const handleResize = () => {
      editIsPad(window.innerWidth <= 970)
      editIsMobile(window.innerWidth <= 760)

      setTimeout(() => {
        const testTextTimeout: HTMLElement | null = document.getElementById('test-text');
        transfer.length = Math.floor(testTextTimeout!.clientWidth / 19);
      }, 300);

			adaptiveLength({ setType, setPosition });

      if (wordsCount) {
        if (window.innerWidth <= 760) wordsCount.style.bottom = `120px`;
        else wordsCount.style.bottom = `130px`;
      };
      
      controllerText.deleteText = 0;
		};
    window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
}