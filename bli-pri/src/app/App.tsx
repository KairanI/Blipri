import { FC, useReducer } from 'react'
import '../index.css'
import { PageTest } from '../pages/Test'
import { PageResult } from '../pages/Result';
import { defaultTextSettings } from '../shared/lib/constant';
import { defaultAdaptiveSettings, defaultFocusSettings } from './lib/constants';
import { FocusReducer } from '../features/Reducer/FocusReducer';
import { TextReducer } from '../features/Reducer/TextReducer';
import { AdaptiveContext, AdaptiveDispatchContext, FocusContext, FocusDispatchContext, TextContext, TextDispatchContext } from './model/Context';
import { AdaptiveReducer } from '../features/Reducer/AdaptiveReducer';

const App: FC = () => {
  const [focusSettings, focusDispatch] = useReducer(FocusReducer, defaultFocusSettings);
  const [adaptiveSettings, adaptiveDispatch] = useReducer(AdaptiveReducer, defaultAdaptiveSettings);
	const [textSettings, textDispatch] = useReducer(TextReducer, defaultTextSettings);


  return (
    <FocusContext.Provider value={focusSettings}>
			<FocusDispatchContext.Provider value={focusDispatch}>

				<TextContext.Provider value={textSettings}>
					<TextDispatchContext.Provider value={textDispatch}>

            <AdaptiveContext.Provider value={adaptiveSettings}>
              <AdaptiveDispatchContext.Provider value={adaptiveDispatch}>

                <div 
                  className={textSettings.page == 'Test' ? 
                    'w-[1265px] max-tOne:w-[970px] max-tTwo:w-[820px] max-[825px]:w-[755px] max-tThree:max-w-[100vw] px-[20px] m-auto' : 
                    'w-[1300px] max-rOne:w-[1100px] max-rTwo:w-[950px] max-rThree:w-[750px] max-rFour:max-w-[100vw] px-[20px] max-rFive:px-[10px] max-rSix:px-0 m-auto'
                  }
                >
                  <div className={textSettings.page == 'Test' ? 'opacity-100 duration-500' : 'opacity-0'}>
                    {textSettings.page == 'Test' && <PageTest />}
                  </div>
                  <div className={textSettings.page == 'Result' ? 'opacity-100 duration-300' : 'opacity-0'}>
                    {textSettings.page == 'Result' && <PageResult />}
                  </div>
                </div>

              </AdaptiveDispatchContext.Provider>
            </AdaptiveContext.Provider>

					</TextDispatchContext.Provider>
				</TextContext.Provider>

			</FocusDispatchContext.Provider>
		</FocusContext.Provider>
  )
}

export default App
