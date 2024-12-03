import { FC, useReducer } from 'react'
import '../index.css'
import { PageTest } from '../pages/Test'
import { PageResult } from '../pages/Result';
import { defaultTextSettings } from '../shared/lib/constant';
import { defaultFocusSettings } from './lib/constants';
import { FocusReducer } from '../features/Reducer/FocusReducer';
import { TextReducer } from '../features/Reducer/TextReducer';
import { FocusContext, FocusDispatchContext, TextContext, TextDispatchContext } from './model/Context';

const App: FC = () => {
  const [focusSettings, focusDispatch] = useReducer(FocusReducer, defaultFocusSettings);
	const [textSettings, textDispatch] = useReducer(TextReducer, defaultTextSettings);

  return (
    <FocusContext.Provider value={focusSettings}>
			<FocusDispatchContext.Provider value={focusDispatch}>

				<TextContext.Provider value={textSettings}>

					<TextDispatchContext.Provider value={textDispatch}>
            <div className='w-[1265px] max-tOne:max-w-[970px] max-tTwo:max-w-[820px] max-[825px]:w-[755px] px-[20px] m-auto'>
              <div className={textSettings.page == 'Test' ? 'opacity-100 duration-500' : 'opacity-0'}>
                {textSettings.page == 'Test' && <PageTest />}
              </div>
              <div className={textSettings.page == 'Result' ? 'opacity-100 duration-300' : 'opacity-0'}>
                {textSettings.page == 'Result' && <PageResult />}
              </div>
            </div>    

					</TextDispatchContext.Provider>
				</TextContext.Provider>

			</FocusDispatchContext.Provider>
		</FocusContext.Provider>
  )
}

export default App
