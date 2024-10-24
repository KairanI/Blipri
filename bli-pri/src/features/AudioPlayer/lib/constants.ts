// interface and type

export interface ITimer {
	minute: number;
	second: number;
}

interface IControllers {
	arrow: boolean;
	inputRange: boolean;
	stop: boolean
}

interface IInterval {
	audio: number;
	timer: number
}

export type TypeAudioPlayer = ({ className, classTimer }: { className: string, classTimer: string }) => JSX.Element

// constants

export let durationTime: ITimer = {
	minute: 0,
	second: 0
}

export let controllers: IControllers = {
	arrow: true,
	inputRange: true,
	stop: false
}

export let interval: IInterval = {
	audio: 0,
	timer: 0
}