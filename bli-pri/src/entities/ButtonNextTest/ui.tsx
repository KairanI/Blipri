import { FC, useContext } from "react";
import { TextDispatchContext } from "../../app/model/Context";

export const ButtonNextTest: FC = () => {
	const textDispatch = useContext(TextDispatchContext);

	return (
		<button 
			className="w-[410px] max-rSix:w-[80vw] h-[40px] rounded-[15px] text-white bg-block-black m-auto flex-center-center buttonNextTest font-jetBrainsMono-medium hover:bg-yellow hover:text-black transition-colors"
			onClick={() => {
				if (textDispatch) textDispatch({ type: 'PageEdit', string: 'Test' })
			}}
		>next test
		</button>
	)
}