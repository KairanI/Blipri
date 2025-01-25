export interface IType {
    content: string
    color: string
}

export interface Iwords {
    finish: number
    end: number
    letters: number
    errors: number
    all: number
}

export interface ILanguageWords {
    [key: string]: string[]
}
export interface IActiveTest {
    activeType: boolean
    activeCaretka: boolean
}

export interface IfocusSettings {
    activeTest: boolean
    activeModalSearch: boolean
	activeModalLength: boolean
    activeModalSideBar: boolean
    activeCaretka: boolean
}

export interface ITextSettings {
    punctuation?: boolean
    number?: boolean
    lengthText?: number
    language?: string
    mode?: string 
    restart?: number
    page?: string
}

export interface ITimer {
	minute: number;
	second: number;
}

export interface IActionFocus {
	type: string
	boolean: boolean
}

export interface IActionText {
    type: string
    boolean?: boolean
    number?: number
    string?: string
}

export interface IGptObject {
    modelUri: string;
    completionOptions: {
        stream: boolean;
        temperature: number;
        maxTokens: string;
    };
    messages: {
        role: string;
        text: string;
    }[];
}

export interface IControllerInput {
    type: boolean
}

export interface IControllerText {
    deleteText: number
    endPoint: number
    startPoint: number
    numWords: number
    req: boolean
    findSpace: boolean
}

export interface IPayload {
	boolean?: boolean
	string?: string
	number?: number
}

export interface IFocusPayload {
    type?: string
    boolean: boolean
}

export interface ITransfer {
    length: number;
}

export interface IContents {
    dictation: string;
    path: string;
}

export interface ITimerTyping {
    second: number,
}

export interface IDataChart {
    second: number;
    wpm: number;
    raw: number;
    errors: {
        error: number;
        raw: number;
    };
}

export interface IResultTest {
    wpm: number;
    acc: number;
}

export interface IAdaptiveSettings {
    isPad: boolean;
    isMobile: boolean;
}

export interface IActionAdaptive {
    type: string
    boolean: boolean
}