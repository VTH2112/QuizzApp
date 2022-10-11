
const initialState = {
    userInfo: [

    ],


}
export default function actionForReducers(state = initialState, action) {
    // console.log(action.payload);
    switch (action.type) {
        case "addUserInfo":
            return {
                ...state,
                userInfo: [
                    ...state.userInfo,
                    action.payload
                ]
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