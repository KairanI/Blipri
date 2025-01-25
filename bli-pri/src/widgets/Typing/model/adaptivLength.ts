import { transfer } from "../../../shared/lib/constant";
import { objectResizeConst, TypeUseResize } from "../lib/config";

export const adaptiveLength: TypeUseResize = ({ setType, setPosition }) => {
	setType(drift => {
		const testText: HTMLElement | null = document.getElementById('test-text');
		if (testText) {
			if (objectResizeConst.mode != 'words') {
				if (testText?.clientWidth > 700 && drift.length > 20) {
					drift.length = 20;
					setPosition(20);
				}
				else if (testText?.clientWidth < 700 && drift.length > 5) {
					drift.length = 5;
					setPosition(5);
				}
			}
			else if (objectResizeConst.positionText > transfer.length) {
				if (testText?.clientWidth > 700 && objectResizeConst.positionText > 20) {
					let resultIndex: number = 0;
					for (let i = 15; i < 50; i++) {
						if (drift[objectResizeConst.positionText - 1 - i].content == ' ') {
							resultIndex = objectResizeConst.positionText - 1 - i;
							i = 50;
						}
					}
					drift.splice(0, resultIndex + 1);
					setPosition(objectResizeConst.positionText - resultIndex - 1);
				}
				else if (testText?.clientWidth < 700 && objectResizeConst.positionText > 5) {
					let resultIndex: number = 0;
					for (let i = 3; i < 20; i++) {
						if (drift[objectResizeConst.positionText - 1 - i].content == ' ') {
							resultIndex = objectResizeConst.positionText - 1 - i;
							i = 20;
						}
					}
					drift.splice(0, resultIndex + 1);
					setPosition(objectResizeConst.positionText - resultIndex - 1);
				}
			}
		}
	})
}