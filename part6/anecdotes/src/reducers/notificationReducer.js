import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		setNotification(state, action) {
			return action.payload
		},
		removeNotification(state, action) {
			return ''
		}
	}
})

export const createNotification = (content) => {
	return dispatch => {
		dispatch(setNotification(content[0]))
		setTimeout(() => {
			dispatch(removeNotification())
		}, content[1] * 1000 )
	}
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer