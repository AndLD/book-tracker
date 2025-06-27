import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isMobile } from 'react-device-detect'

interface IState {
    isMenuCollapsed: boolean
}

const initialState: IState = {
    isMenuCollapsed: isMobile ? true : localStorage.getItem('isMenuCollapsed') === 'true' ? true : false
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setIsMenuCollapsed(state, action: PayloadAction<boolean>) {
            state.isMenuCollapsed = action.payload
            localStorage.setItem('isMenuCollapsed', action.payload.toString())
        }
    }
})

export default adminSlice.reducer
