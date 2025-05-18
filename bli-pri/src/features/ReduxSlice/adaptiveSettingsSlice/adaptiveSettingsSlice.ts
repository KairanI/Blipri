import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { defaultAdaptiveSettings } from '../../../shared/lib/constant'

export const adaptiveSettingsSlice = createSlice({
	name: 'adaptiveSettings',
	initialState: defaultAdaptiveSettings,
	reducers: {
		editIsPad: (state, action: PayloadAction<boolean>) => {
			state.isPad = action.payload
		},
		editIsMobile: (state, action: PayloadAction<boolean>) => {
		state.isMobile = action.payload
		},
	}
})

export default adaptiveSettingsSlice.reducer