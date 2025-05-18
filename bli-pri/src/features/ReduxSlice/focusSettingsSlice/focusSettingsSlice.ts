import {
	createSlice,
	PayloadAction
} from '@reduxjs/toolkit';
import { defaultFocusSettings } from '../../../shared/lib/constant'

export const focusSettingsSlice = createSlice({
	name: 'textSettings',
	initialState: defaultFocusSettings,
	reducers: {
		editSearchModal: (state, action: PayloadAction<boolean>) => {
			state.activeModalSearch = action.payload
		},
		editSideBarModal: (state, action: PayloadAction<boolean>) => {
			state.activeModalSideBar = action.payload
		},
		editLengthModal: (state, action: PayloadAction<boolean>) => {
			state.activeModalLength = action.payload
		},
		editTest: (state, action: PayloadAction<boolean>) => {
			state.activeTest = action.payload
		},
		editCaretka: (state, action: PayloadAction<boolean>) => {
			state.activeCaretka = action.payload
		},
	}
})

export default focusSettingsSlice.reducer