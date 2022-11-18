export const deleteUser = (id) => {
    return {
        type: "deleteUser",
        payload: id
    }
}
export const deleteReward = (id) => {
    return {
        type: "deleteReward",
        payload: id
    }
}
export const deleteQuesCorrect = (id) => {
    return {
        type: "deleteQuesCorrect",
        payload: id
    }
}