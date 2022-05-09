var count = 0
var sCount = 0
export const addTask = (data) => {
  return {
    type: 'ADD_TASK',
    payload: {
      id: count++,
      data: data,
    },
  }
}
export const addSubTask = (sData) => {
  return {
    type: 'ADD_SUB_TASK',
    payload: {
      sId: sCount++,
      sData: sData,
    },
  }
}

export const deleteTask = (id) => {
  return {
    type: 'DELETE_TASK',
    id,
  }
}
export const deleteSubTask = (sId) => {
  return {
    type: 'DELETE_SUB_TASK',
    sId,
  }
}
