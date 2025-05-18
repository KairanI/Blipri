import { FC } from "react"
import '../../index.css'
import { SearchWindow } from "../../features/Search";
import { TypeHandleFocusClik } from "../../shared/Types/types";
import { useAppSelector } from '../../shared/hooks/useAppSelector'
import { useActions } from '../../shared/hooks/useActions'

export const WindowLanguage: FC = () => {
	const focusSettings = useAppSelector(state => state.focusSettings);
    const textSettings = useAppSelector(state => state.textSettings);
    const { editSearchModal } = useActions();

    const handleClick: TypeHandleFocusClik = (type, payload) => {
        if (payload.boolean) {
            editSearchModal(payload.boolean)
            setTimeout(() => {
                const popUp = document.getElementById('pop-up');
                popUp?.classList.add('pop-up-active');
            }, 10)
        } else if (!payload.boolean) {
            const popUp = document.getElementById('pop-up');
            popUp?.classList.remove('pop-up-active');
            setTimeout(() => editSearchModal(payload.boolean), 70);
    }
    }

    return (
        <>
            <div className={`flex-center-center gap-[12px] flex-row m-auto max-w-[170px] h-[35px] font-inter-regular text-lg text-grey tracking-[2px] group ${textSettings?.mode == 'dictation' ? 'buttonLanguage' : 'hover:text-white transition cursor-pointer'}`}
                onClick={() => {
                    if (textSettings?.mode != 'dictation') handleClick('SearchModalEdit', { boolean: true });
                }}
            >
                <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)" fill="#8F8F8F">
                    <path className={textSettings?.mode == 'dictation' ? '' : 'group-hover:fill-white transition'} d="M5.737 15.682c-.022 0-.052.015-.075.015a7.504 7.504 0 0 1-3.367-3.367c0-.023.015-.053.015-.075.915.27 1.86.472 2.797.63.165.945.36 1.883.63 2.797zM15.705 12.338a7.57 7.57 0 0 1-3.488 3.427c.285-.953.525-1.913.683-2.88a23.46 23.46 0 0 0 2.79-.63c-.008.03.015.06.015.082zM15.765 5.782A23.733 23.733 0 0 0 12.9 5.1a20.936 20.936 0 0 0-.683-2.865 7.539 7.539 0 0 1 3.548 3.547zM5.738 2.318c-.27.915-.465 1.845-.623 2.79-.967.15-1.927.39-2.88.675a7.57 7.57 0 0 1 3.428-3.488c.022 0 .052.023.075.023zM11.618 4.942a23.497 23.497 0 0 0-5.235 0 21.28 21.28 0 0 1 .765-3.045c.015-.06.007-.105.015-.165A7.804 7.804 0 0 1 9 1.5c.63 0 1.245.09 1.83.232.008.06.008.105.023.165.337.998.577 2.018.765 3.045zM4.942 11.617a21.032 21.032 0 0 1-3.045-.765c-.06-.014-.105-.007-.165-.014A7.804 7.804 0 0 1 1.5 9c0-.63.09-1.245.232-1.83.06-.007.105-.007.165-.022.998-.33 2.01-.578 3.045-.765a24.43 24.43 0 0 0 0 5.234zM16.5 9c0 .638-.09 1.245-.232 1.838-.06.007-.105 0-.165.014-.998.33-2.018.578-3.045.765.195-1.74.195-3.494 0-5.234a21.28 21.28 0 0 1 3.045.765c.06.015.105.022.165.022.142.593.232 1.2.232 1.83zM11.618 13.057a21.032 21.032 0 0 1-.765 3.045c-.015.06-.015.105-.023.165-.585.143-1.2.233-1.83.233-.637 0-1.245-.09-1.837-.233-.008-.06 0-.104-.015-.165-.33-.997-.578-2.01-.765-3.045.87.098 1.74.165 2.617.165.878 0 1.755-.067 2.618-.165zM11.822 11.822c-1.875.237-3.769.237-5.644 0a22.53 22.53 0 0 1 0-5.644 22.53 22.53 0 0 1 5.644 0c.237 1.875.237 3.769 0 5.644z" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h18v18H0z" /></clipPath></defs>
                </svg>
                {textSettings?.mode == 'dictation' ? 'english' : textSettings?.language}
            </div>

            {focusSettings?.activeModalSearch && (
                <div id="pop-up" className='pop-up'
                    onClick={() => handleClick('SearchModalEdit', { boolean: false })}
                >
                    <div className="w-[90%] max-w-[640px] max-h-[800px] flex flex-col bg-pop-up rounded-[20px] fixed top-[110px]" onClick={e => e.stopPropagation()}>
                        <SearchWindow />
                    </div>
                </div>
            )}

        </>
    )
}