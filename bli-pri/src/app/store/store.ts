import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { textSettingsReducer } from '../../features/ReduxSlice/textSettingsSlice'
import { focusSettingsReducer } from '../../features/ReduxSlice/focusSettingsSlice'
import { adaptiveSettingsReducer } from '../../features/ReduxSlice/adaptiveSettingsSlice'

const reducers = combineReducers({
	textSettings: textSettingsReducer,
	focusSettings: focusSettingsReducer,
	adaptiveSettings: adaptiveSettingsReducer
})

export const store = configureStore({
	reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch