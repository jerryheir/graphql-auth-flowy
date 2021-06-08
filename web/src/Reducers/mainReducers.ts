import * as actionTypes from "../Actions/types";

interface Action {
    type: string;
    payload?: any;
}

const initalState = {
    taskId: 1,
    headerText: []
};
  
const mainReducers = (state = initalState, action: Action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_TASK_ID:{
            return {
                ...state,
                taskId: payload
            }
        }
        case actionTypes.SET_HEADER_TEXT:{
            return {
                ...state,
                headerText: payload
            }
        }
        default:
            return state;
    }
  };
  
  export default mainReducers;