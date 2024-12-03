// interface and type

interface IControllers {
	arrow: boolean;
	inputRange: boolean;
	stop: boolean
}

interface IInterval {
	audio: number;
	timer: number
}

export type TypeAudioPlayer = ({ className, isMobile } : { className: string, isMobile: boolean }) => JSX.Element

// constants

export let controllers: IControllers = {
	arrow: true,
	inputRange: true,
	stop: false
}

export let interval: IInterval = {
	audio: 0,
	timer: 0
}