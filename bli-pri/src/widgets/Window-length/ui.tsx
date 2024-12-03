import { FC, useContext } from "react";
import { FocusDispatchContext } from "../../pages/Test";
import { FocusContext } from "../../app/model/Context";
import { EditLength } from "../../features/EditLength";
import { TypeHandleFocusClik } from "../../shared/Types/types";

export const WindowLength: FC = () => {
	const dispatchFocus = useContext(FocusDispatchContext);
	const focusSettings = useContext(FocusContext);

	const handleClick: TypeHandleFocusClik = (type, payload) => {
		if (dispatchFocus) {
			const popUp = document.getElementById('pop-up-length');
			popUp?.classList.remove('pop-up-active');
			setTimeout(() => dispatchFocus({ type, ...payload }), 100)
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
					<div className="w-[500px] h-[291px] flex flex-col gap-[20px] bg-pop-up rounded-[20px] px-[45px] py-[40px]"
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

