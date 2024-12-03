import { FC, useContext } from "react";
import { TextDispatchContext } from "../../app/model/Context";
import { dataChart } from "../../shared/lib/constant";

export const ButtonNextTest: FC = () => {
	const textDispatch = useContext(TextDispatchContext);

	return (
		<button 
			className="w-[410px] h-[40px] rounded-[15px] text-white bg-block-black m-auto flex-center-center mt-[70px] font-jetBrainsMono-medium hover:bg-yellow hover:text-black transition-colors"
			onClick={() => {
				dataChart.length = 0;
				if (textDispatch) textDispatch({ type: 'PageEdit', string: 'Test' })
			}}
		>next test
		</button>
	)
}