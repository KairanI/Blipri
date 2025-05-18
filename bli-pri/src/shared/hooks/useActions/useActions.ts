import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useAppDispatch } from '../useAppDispatch'
import { textSettingsSlice } from '../../../features/ReduxSlice/textSettingsSlice'
import { focusSettingsSlice } from '../../../features/ReduxSlice/focusSettingsSlice'
import { adaptiveSettingsSlice } from '../../../features/ReduxSlice/adaptiveSettingsSlice'

const rootActions = {
	...textSettingsSlice.actions,
	...focusSettingsSlice.actions,
	...adaptiveSettingsSlice.actions
}

export const useActions = () => {
	const dispatch = useAppDispatch()

	return useMemo(() => 
		bindActionCreators(rootActions, dispatch), 
	[dispatch])
}