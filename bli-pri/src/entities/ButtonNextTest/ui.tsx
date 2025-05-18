import { FC } from "react";
import { useActions } from '../../shared/hooks/useActions'

export const ButtonNextTest: FC = () => {
	const { editPage } = useActions();

	return (
		<button 
			className="w-[410px] max-rSix:w-[80vw] h-[40px] rounded-[15px] text-white bg-block-black m-auto flex-center-center buttonNextTest font-jetBrainsMono-medium hover:bg-yellow hover:text-black transition-colors"
			onClick={() => editPage('Test')}
		>next test
		</button>
	)
}