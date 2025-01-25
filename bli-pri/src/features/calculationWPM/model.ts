import { dataChart, resultTest, timerTyping, words } from "../../shared/lib/constant";;

export const calculationWPM = (status: string): [number, number] => {
	const minutes: number = Number((timerTyping.second / 60).toFixed(2));
  let errors: number = 0;

  if (dataChart.length > 5) {
    for (let a = 0; a < 6; a++) {
      errors += dataChart[dataChart.length - a - 1].errors.error;
    }
  }
  else errors = words.errors;

  let raw: number = Math.floor(words.all / (5 * minutes));
  if (raw == Infinity || raw < 0 || isNaN(raw)) raw = 0;

  let acc: number = Math.floor((words.letters / words.all) * 100);
	let wpm: number = Math.floor(raw - (errors / minutes));

  if (wpm < 0 || isNaN(wpm) || wpm == Infinity) wpm = 0;
  if (acc < 0 || isNaN(acc)) acc = 0;

  if (status == 'wpm') {
    resultTest.wpm = wpm;
    resultTest.acc = acc;
    return [wpm, raw]
  } 
  else return [wpm, acc]
}