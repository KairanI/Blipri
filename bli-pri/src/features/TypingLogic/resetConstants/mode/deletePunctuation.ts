import { contents } from "../../../../shared/lib/constant";
import { massivPunct } from "../lib/constants";

export const deletePunctuation = () => {
	let massiv: string[] = contents.dictation.split('');
	for (let a = 0; a < massiv.length; a++) {
		if (massivPunct.simplePunct.includes(massiv[a])) massiv.splice(a, 1)
		else if (massivPunct.hardPunct.includes(massiv[a])) {
			massiv.splice(a, 1);
			if (massiv.length != a) massiv[a + 1] = massiv[a + 1].toLowerCase();
		}
		else if (massiv[a] == '-' && massiv[a + 1] == ' ' && massiv[a - 1] == ' ') massiv.splice(a, 2);
	};

	return massiv.join('');
}
