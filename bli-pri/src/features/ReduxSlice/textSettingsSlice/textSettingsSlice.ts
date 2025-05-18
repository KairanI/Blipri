import {
	createSlice,
	PayloadAction
} from '@reduxjs/toolkit';
import { defaultTextSettings } from '../../../shared/lib/constant'

export const textSettingsSlice = createSlice({
	name: 'textSettings',
	initialState: defaultTextSettings,
	reducers: {
		editPunctuation: (state, action: PayloadAction<boolean>) => {
			state.punctuation = action.payload
		},
		editNumber: (state, action: PayloadAction<boolean>) => {
			state.number = action.payload
		},
		editLengthText: (state, action: PayloadAction<number>) => {
			state.lengthText = action.payload
		},
		editLanguage: (state, action: PayloadAction<string>) => {
			state.language = action.payload
		},
		editRestart: (state, action: PayloadAction<number>) => {
			state.restart = action.payload
		},
		editMode: (state, action: PayloadAction<string>) => {
			state.mode = action.payload
		},
		editPage: (state, action: PayloadAction<string>) => {
			state.page = action.payload
		},
	}
})

export default textSettingsSlice.reducer