
const initialState = {
    userInfo: [],
    reward: 0,

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
                reward: action.payload + state.reward
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