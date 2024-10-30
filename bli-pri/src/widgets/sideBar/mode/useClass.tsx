import { useImmer } from "use-immer";
import styles from '../ui.module.css';

interface IClassObject {
	sideBar: string;
	containerPunctNumber: string;
	containerMode: string;
	audioPlayer: string;
	timer: string;
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
		timer: styles.timer,
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
				drift.timer = ' transition-all translate-x-[84px]' + ' ' + drift.timer;
			}

			else if (mode == 'antiFocus') {
				if (lastMode == 'dictation') drift.sideBar = 'transition-all' + ' ' + styles.sideBarDictation;
				else if (lastMode == 'zen') drift.sideBar = 'transition-all' + ' ' + styles.sideBarZen;
				else if (lastMode == 'words') drift.sideBar = 'transition-all' + ' ' + styles.sideBar;

				drift.audioPlayer = styles.audioPlayerDictation + ' ' + 'transition-all';
				drift.timer = styles.timerActive + ' ' + 'transition-all';
			}
			
			else if (mode == 'dictation' && lastMode == 'zen') {
				drift.containerPunctNumber = styles.containerPunctNumberDictationZen;
				drift.containerMode = styles.containerModeDictationZen;
				drift.sideBar = styles.sideBarDictation;
				drift.number = styles.numberDictation
				drift.audioPlayer = styles.audioPlayerDictationZen;
				drift.timer = styles.timerActive;
				drift.containerNumber = styles.containerNumberDictationZen;
				drift.ten = styles.tenDictation;
				drift.twentyFive = styles.allNumberDictation;
				drift.fiftieth = styles.allNumberDictation;
				drift.hundred = styles.allNumberDictation;
			}
	
			else if (mode == 'zen') {
				drift.sideBar = styles.sideBarZen + ' ' + 'duration-500';
				drift.containerPunctNumber = styles.containerPunctNumberZen;
				drift.containerMode = styles.containerMode;
				drift.containerNumber = styles.containerNumberZen;
				drift.ten = '',
				drift.twentyFive = '',
				drift.fiftieth = '',
				drift.hundred = ''
	
				if (lastMode == 'dictation') {
					drift.audioPlayer = styles.audioPlayer;
					drift.timer = styles.timer;
				}
			}
	
			else if (mode == 'dictation') {
				drift.sideBar = styles.sideBarDictation;
				drift.containerMode = styles.containerModeDictation;
				drift.containerPunctNumber = styles.containerPunctNumberDictation;
				drift.containerNumber = styles.containerNumberDictation;
				drift.number = styles.numberDictation
				drift.audioPlayer = styles.audioPlayerDictation;
				drift.timer = styles.timerActive;
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
				drift.timer = styles.timer;
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
			}, 500)
		}
	}

	return [classObject, classEdit]
}