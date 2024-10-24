import axios from "axios";

export const GetText: (length: number) => Promise<string> = async (length) => {
	let lengthText = 0;
	if (length < 50) lengthText = 100;
	else lengthText = 690;

	try {
		let response = await axios.post('/gpt', {
			gptApi: {
				model: "GigaChat",
				messages: [{ role: "user", content: `Напиши текст на 100 слов` }],
				stream: false,
				repetition_penalty: 1
			},
			length: length
		}, {
			headers: {
				'Content-Type': 'application/json',
			}
		})
	
		return response.data
	} catch (error) {
		return error
	}
}
