import { EndPunctuationSymbol, numbers, punctuationSymbol } from "../../lib/constant";
import { ILanguageWords, ITextSettings, IType } from "../../Types/interface";
import languageWords from "../../lib/languageWords.json";

const langWords: ILanguageWords = languageWords as ILanguageWords;

export const createText = (textSettings: ITextSettings, lengthText: number, generalController: boolean) => {
	const wordsMassiv: string[] = langWords[textSettings.language as keyof typeof langWords];
	const massivSymbols: IType[] = [];

	let endPunctController: boolean = false;
	let bracketController: boolean = false;
	let sentence: string = '';
	let sentenceMassiv: string[] = [];

	for(let i = 0; i < lengthText; i++) {
		const posRandomWord: number = Math.floor(Math.random() * 1000);
		sentenceMassiv.push(wordsMassiv[posRandomWord]);

		if (bracketController) {
			sentenceMassiv.splice(sentenceMassiv.length - 3, 0, '(')
			sentenceMassiv.splice(sentenceMassiv.length - 2, 0, ')')
			bracketController = false;
		}

		if (endPunctController) {
			const punctWord: string = sentenceMassiv[sentenceMassiv.length - 1];
			sentenceMassiv[sentenceMassiv.length - 1] = punctWord[0].toUpperCase() + punctWord.slice(1);
			endPunctController = false;
		}

		if (textSettings.punctuation && Math.random() < 0.3) {
			const posPunctuation: number = Math.floor((posRandomWord / 1000) * punctuationSymbol.length);
			if (EndPunctuationSymbol.includes(punctuationSymbol[posPunctuation])) endPunctController = true;
			if (punctuationSymbol[posPunctuation] == '-') sentenceMassiv.push(' ');
			if (punctuationSymbol[posPunctuation] == '(') bracketController = true;
			if (bracketController == false) sentenceMassiv.push(punctuationSymbol[posPunctuation]);
		} 

		if (textSettings.number && Math.random() > 0.8) {
			let strNum: string = '';
			const lenghtNum: number = Math.floor((posRandomWord / 1000) * 4);
			for(let a = 0; a < lenghtNum + 1; a++) {
				const posNum: number = Math.floor(Math.random() * numbers.length);
				strNum += numbers[posNum];
			}
			sentenceMassiv.push(' ');
			sentenceMassiv.push(strNum);
		}

		if (i < lengthText - 1) sentenceMassiv.push(' ');
	}


	const firstWord: string = sentenceMassiv[0];
	if (generalController && textSettings.punctuation) sentenceMassiv[0] = firstWord[0].toUpperCase() + firstWord.slice(1);

	sentence = sentenceMassiv.join('');

	for(let i = 0; i < sentence.length; i++) {
			massivSymbols.push({content: sentence[i], color: 'grey'})
	}

	return massivSymbols
}
