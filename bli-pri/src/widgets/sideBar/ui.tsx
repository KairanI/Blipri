import { useContext, useEffect, useState } from "react";
import { FocusContext, FocusDispatchContext, TextContext, TextDispatchContext } from "../../pages/Test/model/Context";
import { TypeHandleClik } from "../../shared/Types/types";
import { useAnimate } from "../../shared/model/hooks";
import { useClass } from "./mode/useClass";
import { controllerInput } from "../../shared/lib/constant";
import styles from './ui.module.css'
import { AudioPlayer } from "../../features/AudioPlayer";

let lastMode: string = '';
const massivLength: number[] = [10, 25, 50, 100];

export const SideBar = () => {
	const textSettings = useContext(TextContext);
	const focusSettings = useContext(FocusContext);
	const dispatchText = useContext(TextDispatchContext);
	const dispatchFocus = useContext(FocusDispatchContext);
	const [showPlayer, setShowPlayer] = useState<boolean>(false);
	const [isAnimating, startAnimate] = useAnimate();
	const [classObject, classEdit] = useClass();

	const handleClick: TypeHandleClik = (type, payload) => {
		if (!isAnimating && dispatchText && payload.string != textSettings?.mode) {
			if (payload.string) {
				lastMode = textSettings?.mode as string
				classEdit(payload.string, lastMode);
				if (payload.string == 'dictation') setShowPlayer(true)
				else if (lastMode == 'dictation') setTimeout(() => setShowPlayer(false), 500)
				startAnimate(true);
			}
			else startAnimate(false);

			setTimeout(() => dispatchText({ type, ...payload }), 100);
		}
	};

	useEffect(() => {
		if (focusSettings?.activeTest) classEdit('focus', textSettings?.mode as string);
		else classEdit('antiFocus', textSettings?.mode as string);
	}, [focusSettings?.activeTest])

	return (
		<>
			{showPlayer && <AudioPlayer className={classObject.audioPlayer} classTimer={classObject.timer} />}
			<div className={classObject.sideBar}>
				<div className={classObject.containerPunctNumber}>
					<div className={textSettings?.punctuation ? styles.punctuationActive : styles.punctuation}
						onClick={() => handleClick('PunctuationEdit', { boolean: !textSettings?.punctuation })}
					>
						<span className='font-inter-bold'>@</span>
						punctuation
					</div>
					<div className={textSettings?.number ? styles.numberActive + ' ' + classObject.number : styles.number + ' ' + classObject.number}
						onClick={() => handleClick('NumberEdit', { boolean: !textSettings?.number })}
					>
						<span className='font-inter-bold'>#</span>
						number
					</div>
					<div className={textSettings?.mode == 'dictation' ? styles.septumDictation : styles.septum}></div>
				</div>
				<div className={classObject.containerMode}>
					<div className={textSettings?.mode == 'words' ? styles.wordsActive : styles.words}
						onClick={() => handleClick('ModeEdit', { string: 'words' })}
					> 
						<span className='font-kadwa-bold mt-[1px]'>A</span>
						words
					</div>
					<div className={textSettings?.mode == 'dictation' ? 'text-yellow w-[121px] h-[60px] flex-center-center flex-row gap-1.5 self-center transition-colors group hover:text-white cursor-pointer' : 'w-[121px] h-[60px] flex-center-center flex-row gap-1.5 self-center transition-colors group hover:text-white cursor-pointer'} 
						onClick={() => handleClick('ModeEdit', { string: 'dictation' })}
					>
						<svg width="18" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path className={textSettings?.mode == 'dictation' ? 'svg-active group-hover:svg-pointer transition-colors' : 'group-hover:svg-pointer transition-colors'} d="M.978 11.27A.985.985 0 0 1 0 10.29V4.696c0-.535.443-.979.978-.979.535 0 .979.444.979.979v5.595a.977.977 0 0 1-.979.979zM4.891 13.135a.985.985 0 0 1-.978-.979V2.843c0-.534.444-.978.978-.978.535 0 .979.444.979.978v9.313a.977.977 0 0 1-.979.979zM8.804 15a.985.985 0 0 1-.978-.978V.978c0-.535.443-.978.978-.978.535 0 .978.443.978.978v13.044a.985.985 0 0 1-.978.978zM12.717 13.135a.985.985 0 0 1-.978-.979V2.843c0-.534.444-.978.978-.978.535 0 .979.444.979.978v9.313a.977.977 0 0 1-.979.979zM16.63 11.27a.985.985 0 0 1-.978-.979V4.696c0-.535.444-.979.978-.979.535 0 .979.444.979.979v5.595a.977.977 0 0 1-.979.979z" fill="#797979" fillOpacity=".8" />
						</svg>
						dictation
					</div>
					<div className={textSettings?.mode == 'zen' ? 'text-yellow w-[80px] h-[60px] flex-center-center flex-row gap-1.5 self-center transition-colors group hover:text-white cursor-pointer' : 'w-[80px] h-[60px] flex-center-center flex-row gap-1.5 self-center transition-colors group hover:text-white cursor-pointer'}
						onClick={() => handleClick('ModeEdit', { string: 'zen' })}
					>
						<svg width="17" height="17" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path className={textSettings?.mode == 'zen' ? 'svg-active group-hover:svg-pointer transition-colors' : 'group-hover:svg-pointer transition-colors'} d="M14.315 5.54 8.861 8.697a.73.73 0 0 1-.722 0L2.684 5.54c-.39-.226-.488-.758-.19-1.09.205-.234.438-.426.686-.56l3.84-2.125c.821-.46 2.153-.46 2.974 0l3.84 2.125c.248.134.481.333.687.56.283.332.184.864-.206 1.09zM8.096 10.016v4.83a.716.716 0 0 1-1.027.66C5.61 14.79 3.152 13.45 3.152 13.45c-.864-.489-1.572-1.721-1.572-2.734V7.062c0-.56.588-.914 1.07-.637l5.092 2.953a.762.762 0 0 1 .354.638zM8.904 10.016v4.83c0 .539.545.893 1.027.66 1.46-.716 3.917-2.055 3.917-2.055.864-.489 1.572-1.721 1.572-2.734V7.062c0-.56-.587-.914-1.07-.637L9.259 9.378a.762.762 0 0 0-.354.638z" fill="#797979" fillOpacity=".8" />
						</svg>
						zen
					</div>
				</div>
				<div className={classObject.containerNumber}>
					<div className={textSettings?.mode == 'dictation' ? styles.septumDictation : styles.septum}></div>
					<div
						className={textSettings?.lengthText == 10 ? styles.tenActive + ' ' + classObject.ten : styles.ten + ' ' + classObject.ten}
						onClick={() => handleClick('LengthTextEdit', { number: 10 })}
					>{textSettings?.mode == "dictation" ? '1' : '10'}</div>
					<div
						className={textSettings?.lengthText == 25 ? styles.twentyFiveActive + ' ' + classObject.twentyFive : styles.twentyFive + ' ' + classObject.twentyFive}
						onClick={() => handleClick('LengthTextEdit', { number: 25 })}
					>{textSettings?.mode == "dictation" ? '2' : '25'}</div>
					<div
						className={textSettings?.lengthText == 50 ? styles.fiftiethActive + ' ' + classObject.fiftieth : styles.fiftieth + ' ' + classObject.fiftieth}
						onClick={() => handleClick('LengthTextEdit', { number: 50 })}
					>{textSettings?.mode == "dictation" ? '3' : '50'}</div>
					<div
						className={textSettings?.lengthText == 100 ? styles.hundredActive + ' ' + classObject.hundred : styles.hundred + ' ' + classObject.hundred}
						onClick={() => handleClick('LengthTextEdit', { number: 100 })}
					>{textSettings?.mode == "dictation" ? '4' : '100'}</div>
					<div className={textSettings?.mode == 'dictation' ? 'w-0 h-[60px] flex-center-center group cursor-pointer opacity-0 invisible duration-300' : 'w-[49px] h-[60px] flex-center-center group cursor-pointer duration-500'}
						onClick={() => {
							if (dispatchFocus) dispatchFocus({ type: 'LengthModalEdit', boolean: true })
							setTimeout(() => {
								const popUp = document.getElementById('pop-up-length');
								popUp?.classList.add('pop-up-active');
							}, 10)
							controllerInput.type = true;
						}}
					>
						<svg width="19" height="19" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path className={textSettings?.lengthText && massivLength.includes(textSettings.lengthText) && textSettings?.lengthText <= 100 ? 'group-hover:svg-pointer transition-colors fill-' : 'svg-active transition-colors group-hover:svg-pointer'} d="M5.938 3.562H5.74V1.583A.598.598 0 0 0 5.146.99a.598.598 0 0 0-.594.593v1.98h-.198c-1.259 0-1.979.72-1.979 1.979v4.75c0 1.258.72 1.979 1.98 1.979h.197v5.146c0 .324.27.593.594.593.324 0 .594-.269.594-.593V12.27h.197c1.26 0 1.98-.72 1.98-1.98v-4.75c0-1.258-.72-1.979-1.98-1.979zM14.646 6.73h-.198V1.582a.598.598 0 0 0-.594-.593.598.598 0 0 0-.594.593V6.73h-.198c-1.258 0-1.979.72-1.979 1.98v4.75c0 1.258.72 1.979 1.98 1.979h.197v1.979c0 .324.27.593.594.593.325 0 .594-.269.594-.593v-1.98h.198c1.258 0 1.979-.72 1.979-1.979v-4.75c0-1.258-.72-1.979-1.98-1.979z" fill="#797979" fillOpacity=".8" />
						</svg>
					</div>
				</div>
			</div>
		</>
	)
}