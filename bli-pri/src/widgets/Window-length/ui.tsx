import { FC } from "react";
import { EditLength } from "../../features/EditLength";
import { TypeHandleFocusClik } from "../../shared/Types/types";
import { useAppSelector } from '../../shared/hooks/useAppSelector'
import { useActions } from '../../shared/hooks/useActions'

export const WindowLength: FC = () => {
	const { editSideBarModal, editLengthModal } = useActions();
	const focusSettings = useAppSelector(state => state.focusSettings);
	const adaptiveSettings = useAppSelector(state => state.adaptiveSettings);

	const handleClick: TypeHandleFocusClik = (type, payload) => {
			const popUp = document.getElementById('pop-up-length');
			popUp?.classList.remove('pop-up-active');
			setTimeout(() => editLengthModal(payload.boolean), 100);

			if (adaptiveSettings?.isMobile && !payload.boolean) {
				editSideBarModal(true)
				setTimeout(() => {
					const popUpSideBarMobile = document.getElementById('pop-up-sideBarMobile');
					popUpSideBarMobile?.classList.add('pop-up-active');
			}, 10)
		}
	}

	return (
		<>
			{focusSettings?.activeModalLength && (
				<div id="pop-up-length" className='pop-up'
					onClick={() => handleClick('LengthModalEdit', { boolean: false })}
					onMouseDown={e => {
						e.preventDefault();
					}}
				>
					<div className="min-w-[100px] max-w-[500px] min-h-[291px] mx-[40px] flex flex-col gap-[20px] bg-pop-up rounded-[20px] px-[45px] py-[40px]"
						onClick={e => e.stopPropagation()}
						onMouseDown={e => {
							e.stopPropagation();
						}}
					>
						<EditLength />
					</div>
				</div>
			)}
		</>
	)
}

