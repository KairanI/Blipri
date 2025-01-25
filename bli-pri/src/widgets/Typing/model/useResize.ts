import { controllerText, transfer } from "../../../shared/lib/constant";
import { useContext, useEffect } from "react";
import { AdaptiveDispatchContext } from "../../../app/model/Context";
import { TypeUseResize } from "../lib/config";
import { adaptiveLength } from "./adaptivLength";

export const useResize: TypeUseResize = ({ setType, setPosition }) => {
	const adaptiveDispatch = useContext(AdaptiveDispatchContext);
	useEffect(() => {
    const wordsCount: HTMLElement | null = document.getElementById('wordsCount');
    
    if (wordsCount) {
      if (window.innerWidth <= 760) wordsCount.style.bottom = `120px`;
      else wordsCount.style.bottom = `130px`;
    };

    const testTextTimeout: HTMLElement | null = document.getElementById('test-text');
    transfer.length = Math.floor(testTextTimeout!.clientWidth / 19);

		const handleResize = () => {
			if (adaptiveDispatch) {
				adaptiveDispatch({type: 'IsPadEdit', boolean: window.innerWidth <= 970})
      	adaptiveDispatch({type: 'IsMobileEdit', boolean: window.innerWidth <= 760})
			}

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