import { TypeSideBarMobileComponent } from "../../shared/Types/types";
import { controllerInput, massivLength } from "../../shared/lib/constant";
import { useAppSelector } from '../../shared/hooks/useAppSelector'
import { useActions } from '../../shared/hooks/useActions'

export const SideBarWindow: TypeSideBarMobileComponent = ({ handleClick, handlePopUp }) => {
	const textSettings = useAppSelector(state => state.textSettings);
	const { editLengthModal } = useActions();
	
	return (
		<div 
			className={`w-[291px] flex flex-col bg-pop-up rounded-[15px] fixed px-[30px] py-[20px] font-inter-regular ${textSettings?.mode != 'zen' ? 'gap-[30px]' : ''}`}
			onClick={e => e.stopPropagation()}
		>
			<div className="flex flex-col gap-[10px]">
				{textSettings?.mode != 'zen' && (
					<div
						className={`w-[231px] h-[40px] rounded-[5px] bg-block-black text-[16px] flex-center-center tracking-[1px] ${textSettings?.punctuation ? 'bg-yellow-button text-black' : 'text-white'}`}
						onClick={() => handleClick('PunctuationEdit', { boolean: !textSettings?.punctuation })}
					>punctuation</div>
				)}
				{textSettings?.mode == 'words' && (
					<div 
						className={`w-[231px] h-[40px] rounded-[5px] bg-block-black text-[16px] flex-center-center tracking-[1px] ${textSettings?.number ? 'bg-yellow-button text-black' : 'text-white'}`}
						onClick={() => handleClick('NumberEdit', { boolean: !textSettings?.number })}
					>number</div>
				)}
			</div>
			<div className="flex flex-col gap-[10px]">
				<div 
					className={`w-[231px] h-[40px] rounded-[5px] bg-block-black text-[16px] flex-center-center tracking-[1px] ${textSettings?.mode == 'words' ? 'bg-yellow-button text-black' : 'text-white'}`}
					onClick={() => handleClick('ModeEdit', { string: 'words' })}
				>
					words
				</div>
				<div 
					className={`w-[231px] h-[40px] rounded-[5px] bg-block-black text-[16px] flex-center-center tracking-[1px] ${textSettings?.mode == 'dictation' ? 'bg-yellow-button text-black' : 'text-white'}`}
					onClick={() => handleClick('ModeEdit', { string: 'dictation' })}
				>
					dictation
				</div>
				<div 
					className={`w-[231px] h-[40px] rounded-[5px] bg-block-black text-[16px] flex-center-center tracking-[1px] ${textSettings?.mode == 'zen' ? 'bg-yellow-button text-black' : 'text-white'}`}
					onClick={() => handleClick('ModeEdit', { string: 'zen' })}
				>
					zen
				</div>
			</div>
			{textSettings?.mode != 'zen' && (
				<div className="flex flex-col gap-[10px]">
					<div 
							className={`w-[231px] h-[40px] rounded-[5px] bg-block-black text-[16px] flex-center-center tracking-[1px] ${textSettings?.lengthText == 10 ? 'bg-yellow-button text-black' : 'text-white'}`}
							onClick={() => handleClick('LengthTextEdit', { number: 10 })}
					>{textSettings?.mode == "dictation" ? '1' : '10'}</div>
					<div 
						className={`w-[231px] h-[40px] rounded-[5px] bg-block-black text-[16px] flex-center-center tracking-[1px] ${textSettings?.lengthText == 25 ? 'bg-yellow-button text-black' : 'text-white'}`}
						onClick={() => handleClick('LengthTextEdit', { number: 25 })}
					>{textSettings?.mode == "dictation" ? '2' : '25'}</div>
					<div 
						className={`w-[231px] h-[40px] rounded-[5px] bg-block-black text-[16px] flex-center-center tracking-[1px] ${textSettings?.lengthText == 50 ? 'bg-yellow-button text-black' : 'text-white'}`}
						onClick={() => handleClick('LengthTextEdit', { number: 50 })}
					>{textSettings?.mode == "dictation" ? '3' : '50'}</div>
					<div 
						className={`w-[231px] h-[40px] rounded-[5px] bg-block-black text-[16px] flex-center-center tracking-[1px] ${textSettings?.lengthText == 100 ? 'bg-yellow-button text-black' : 'text-white'}`}
						onClick={() => handleClick('LengthTextEdit', { number: 100 })}
					>{textSettings?.mode == "dictation" ? '4' : '100'}</div>
					{textSettings?.mode == 'words' && (
						<div 
							className={`w-[231px] h-[40px] rounded-[5px] bg-block-black text-[16px] flex-center-center tracking-[1px] ${textSettings?.lengthText && massivLength.includes(textSettings.lengthText) && textSettings?.lengthText <= 100 ? 'text-white' : 'bg-yellow-button text-black'}`}
							onClick={() => {
								editLengthModal(true)
								if (handlePopUp) handlePopUp('SideBarModalEdit', { boolean: false });

								setTimeout(() => {
									const popUp = document.getElementById('pop-up-length');
									popUp?.classList.add('pop-up-active');
								}, 10)
								controllerInput.type = true;
							}}
						>
							custom
						</div>
					)}
				</div>
			)}
    </div>
	)
}