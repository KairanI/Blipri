import { FC, useContext } from "react";
import { FocusDispatchContext } from "../../pages/Test";
import { AdaptiveContext, FocusContext } from "../../app/model/Context";
import { EditLength } from "../../features/EditLength";
import { TypeHandleFocusClik } from "../../shared/Types/types";

export const WindowLength: FC = () => {
	const dispatchFocus = useContext(FocusDispatchContext);
	const focusSettings = useContext(FocusContext);
	const adaptiveSettings = useContext(AdaptiveContext);

	const handleClick: TypeHandleFocusClik = (type, payload) => {
		if (dispatchFocus) {
			const popUp = document.getElementById('pop-up-length');
			popUp?.classList.remove('pop-up-active');
			setTimeout(() => dispatchFocus({ type, ...payload }), 100);

			if (adaptiveSettings?.isMobile && !payload.boolean) {
				console.log("Hello");
				dispatchFocus({type: 'SideBarModalEdit', boolean: true});
				setTimeout(() => {
					const popUpSideBarMobile = document.getElementById('pop-up-sideBarMobile');
					popUpSideBarMobile?.classList.add('pop-up-active');
			}, 10)
		}
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

