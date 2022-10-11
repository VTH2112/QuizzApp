import { combineReducers } from "redux"
import info from './infoReducer'
const reducers = combineReducers({
    userInfo: info
})

export default (state, action) => reducers(state, action)