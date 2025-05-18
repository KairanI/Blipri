import { IAdaptiveSettings, IContents, IControllerInput, IControllerText, IDataChart, IfocusSettings, IResultTest, ITextSettings, ITimer, ITimerTyping, ITransfer, Iwords } from "../Types/interface"

export let words: Iwords = {
    finish: 0,
    end: 10,
    letters: 0,
    errors: 0,
    all: 0,
}

export let controllerText: IControllerText = {
    deleteText: 0,
    endPoint: 0,
    startPoint: 0,
    numWords: 0,
    req: false,
    findSpace: false,
};

export let resultTest: IResultTest = {
    wpm: 0,
    acc: 0,
}

export let timerTyping: ITimerTyping = {
    second: 0,
}

export let transfer: ITransfer = {
    length: 62,
}

export let controllerInput: IControllerInput = {
    type: true,
}

export let errorLetters: number[] = [0]

export const EndPunctuationSymbol: string[] = ['!', '.', '?']

export const punctuationSymbol: string[] = [...EndPunctuationSymbol, ',', '(', ';', ':', '-']

export const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export let contents: IContents = {
    dictation: "",
    path: "",
}


export const defaultTextSettings: ITextSettings = {
	punctuation: false,
	number: false,
	lengthText: 10,
	language: 'english',
    mode: 'words',
    restart: 0,
    page: 'Test',
}

export const dataChart: IDataChart[] = [
    {
        second: 1,
        wpm: 20,
        raw: 40,
        errors: {
            error: 0,
            raw: 10,
        }
    }
];

export let durationTime: ITimer = {
	minute: 0,
	second: 0
}

export const defaultFocusSettings: IfocusSettings = {
	activeTest: false,
	activeModalSearch: false,
	activeModalLength: false,
	activeModalSideBar: false,
	activeCaretka: true
}

export const defaultAdaptiveSettings: IAdaptiveSettings = {
	isPad: window.innerWidth <= 970,
	isMobile: window.innerWidth <= 760,
}

export const massivLength: number[] = [10, 25, 50, 100];

export const ban_keys: string[] = ['Backspace', 'Alt', 'Tab', 'Enter', 'Control', 'Shift', 'CapsLock', 'Meta', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'NumLock', 'Home', 'Clear', 'Insert', 'Delete', 'End', 'PageUp', 'PageDown', 'ScrollLock', 'Pause', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Escape', 'LaunchApplication1', 'LaunchMail', 'MediaPlayPause', 'AudioVolumeUp', 'AudioVolumeDown', 'AudioVolumeMute'];