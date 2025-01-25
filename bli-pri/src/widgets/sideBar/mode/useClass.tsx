import { useImmer } from "use-immer";
import styles from '../ui.module.css';

interface IClassObject {
	sideBar: string;
	containerPunctNumber: string;
	containerMode: string;
	audioPlayer: string;
	containerNumber: string;
	number: string;
	ten: string;
	twentyFive: string;
	fiftieth: string;
	hundred:string;
}

export const useClass: () => [IClassObject, (mode: string, lastMode: string) => void] = () => {
	const [classObject, setClassObject] = useImmer<IClassObject>({
		sideBar: styles.sideBar,
		containerPunctNumber: styles.containerPunctNumber,
		containerMode: styles.containerMode,
		number: 'transition-colors',
		audioPlayer: styles.audioPlayer,
		containerNumber: styles.containerNumber,
		ten: '',
		twentyFive: '',
		fiftieth: '',
		hundred: ''
	});

	const classEdit = (mode: string, lastMode: string) => {
		setClassObject(drift => {
			if (mode == 'focus') {
				if (lastMode == 'dictation') drift.sideBar = 'opacity-0 transition-all' + ' ' + drift.sideBar;
				else if (lastMode == 'zen') drift.sideBar = 'opacity-0 transition-all' + ' ' + styles.sideBarZen;
				else if (lastMode == 'words') drift.sideBar = 'opacity-0 transition-all' + ' ' + styles.sideBar;

				drift.audioPlayer = 'translate-x-[-55%] transition-all' + ' ' + drift.audioPlayer;
			}

			else if (mode == 'antiFocus') {
				if (lastMode == 'dictation') drift.sideBar = 'transition-all' + ' ' + styles.sideBarDictation;
				else if (lastMode == 'zen') drift.sideBar = 'transition-all' + ' ' + styles.sideBarZen;
				else if (lastMode == 'words') drift.sideBar = 'transition-all' + ' ' + styles.sideBar;

				drift.audioPlayer = styles.audioPlayerDictation + ' ' + 'transition-all';
			}
			
			else if (mode == 'dictation' && lastMode == 'zen') {
				drift.containerPunctNumber = styles.containerPunctNumberDictationZen;
				drift.containerMode = styles.containerModeDictationZen;
				drift.sideBar = styles.sideBarDictation;
				drift.number = styles.numberDictation
				drift.audioPlayer = styles.audioPlayerDictationZen;
				drift.containerNumber = styles.containerNumberDictationZen;
				drift.ten = styles.tenDictation;
				drift.twentyFive = styles.allNumberDictation;
				drift.fiftieth = styles.allNumberDictation;
				drift.hundred = styles.allNumberDictation;
			}
	
			else if (mode == 'zen') {
				drift.sideBar = styles.sideBarZen + ' ' + 'duration-500';
				drift.containerPunctNumber = lastMode == 'NoAnimate' ? styles.containerPunctNumberZenNoAnimate : styles.containerPunctNumberZen;
				drift.containerMode = lastMode == 'NoAnimate' ? styles.containerModeNoAnimate : styles.containerMode;
				drift.containerNumber = lastMode == 'NoAnimate' ? styles.containerNumberZenNoAnimate : styles.containerNumberZen;
				drift.ten = '',
				drift.twentyFive = '',
				drift.fiftieth = '',
				drift.hundred = ''
	
				if (lastMode == 'dictation') drift.audioPlayer = styles.audioPlayer;	
			}
	
			else if (mode == 'dictation') {
				drift.sideBar = styles.sideBarDictation;
				drift.containerMode = lastMode == 'NoAnimate' ? styles.containerModeDictation : styles.containerModeDictation + ' duration-[600ms]';
				drift.containerPunctNumber = lastMode == 'NoAnimate' ? styles.containerPunctNumberDictation : styles.containerPunctNumberDictation + ' duration-[600ms]';  
				drift.containerNumber = lastMode == 'NoAnimate' ? styles.containerNumberDictation : styles.containerNumberDictation + ' duration-[600ms]';
				drift.number = styles.numberDictation
				drift.audioPlayer = styles.audioPlayerDictation;
				drift.ten = styles.tenDictation;
				drift.twentyFive = styles.allNumberDictation;
				drift.fiftieth = styles.allNumberDictation;
				drift.hundred = styles.allNumberDictation;
			}
	
			else if (mode == 'words') {
				drift.sideBar = styles.sideBar + ' ' + 'duration-500';
				drift.containerPunctNumber = styles.containerPunctNumber;
				drift.containerNumber = styles.containerNumber;
				drift.containerMode = styles.containerMode;
				drift.audioPlayer = styles.audioPlayer;
				drift.ten = '',
				drift.twentyFive = '',
				drift.fiftieth = '',
				drift.hundred = ''
			}
	
			if (mode == 'words' || mode == 'zen' && lastMode == 'dictation') drift.number = 'duration-500'
		})

		if (mode == 'words' || mode == 'zen' && lastMode == 'dictation') {
			setTimeout(() => {
				setClassObject(drift => {
					 drift.number = 'transition-colors'

				})
			}, 400)
		}

		if (mode == 'dictation') {
			setTimeout(() => {
				setClassObject(drift => {
					drift.ten = styles.ten,
					drift.twentyFive = styles.allNumber,
					drift.fiftieth = styles.allNumber,
					drift.hundred = styles.allNumber
			 })
			}, 500)
		}
	}

	return [classObject, classEdit]
}