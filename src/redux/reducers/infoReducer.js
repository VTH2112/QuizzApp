
const initialState = {
    userInfo: [],
    reward: [],

}
export default function actionForReducers(state = initialState, action) {
    // console.log(action.payload);
    switch (action.type) {
        case "addUserInfo":
            return {
                ...state,
                userInfo: [
                    action.payload
                ]
            }
        case "addReward":
            return {
                ...state,
                reward: [
                    ...state.reward,
                    action.payload
                ]
            }
        case "deleteReward":
            return {
                ...state,
                reward: []
            }
        case "deleteUser":
            return {
                ...state,
                studentInfo: state.studentInfo.filter(i => i.id !== action.payload.id)
            };
        default:
            return state
    }
}