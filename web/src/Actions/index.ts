import * as actionTypes from "./types";

interface Header {
  id: number;
  task: string;
}

export const updateTaskId = (taskId: number) => async (dispatch: any) => {
  dispatch({
    type: actionTypes.SET_TASK_ID,
    payload: taskId
  })
}

export const updateHeaderText = (id: number, task: string) => async (dispatch: any, getState: any) => {
  const { headerText } = getState().main;
  const index: number = headerText.findIndex((i: Header)=>i.id === id);
  const newHeaderText = headerText.filter((_a: any, b: number)=>b < index);
  dispatch({
    type: actionTypes.SET_HEADER_TEXT,
    payload: id === 0 ? [] : index === -1 ? [...headerText, { id, task }] : [...newHeaderText, { id, task }]
  })
}