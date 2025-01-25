// interface and type

import { Updater } from "use-immer";
import { ITimer } from "../../../shared/Types/interface";

interface IControllers {
	arrow: boolean;
	inputRange: boolean;
	stop: boolean
}

interface IInterval {
	audio: number;
	timer: number
	timeout: number,
}

export type TypeAudioPlayer = ({ className } : { className: string }) => JSX.Element

export type TypePlayerComponents = ({ play, range, audio, setPlay, setTimer } : {
	play: boolean,
	range: HTMLInputElement | null,
	audio: HTMLAudioElement | null,
	setPlay: React.Dispatch<React.SetStateAction<boolean>>,
	setTimer: Updater<ITimer>
}) => JSX.Element;

export type TypeAudioLine = ({ audioRef, setPlay } : { 
	audioRef: React.RefObject<HTMLAudioElement> 
	setPlay: () => void;
}) => JSX.Element


export type TypeHandleClickPlay = ({ range, audio, setPlay } : {
	range: HTMLInputElement | null,
	audio: HTMLAudioElement | null,
	setPlay: React.Dispatch<React.SetStateAction<boolean>>,
	setTimer: Updater<ITimer>
}) => void;


// constants

export let controllers: IControllers = {
	arrow: true,
	inputRange: true,
	stop: false
}

export let interval: IInterval = {
	audio: 0,
	timer: 0,
	timeout: 0,
}