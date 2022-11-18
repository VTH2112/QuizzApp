
export const addUserInfo = (data) => {
    return {
        type: "addUserInfo",
        payload: data,
    }
}

export const addReward = (data) => {
    return {
        type: "addReward",
        payload: data,
    }
}
export const addQuesCorrect = (data) => {
    return {
        type: "addQuesCorrect",
        payload: data,
    }
}