export interface IType {
    content: string
    color: string
}

export interface Iwords {
    finish: number
    end: number
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
    activeCaretka: boolean
}

export interface ITextSettings {
    punctuation?: boolean
    number?: boolean
    lengthText?: number
    language?: string
    mode?: string 
    restart?: number
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
    controller: number
}