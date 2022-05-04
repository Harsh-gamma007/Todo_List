var count = 0
export const addTask = (data) => {
  return {
    type: 'ADD_TASK',
    payload: {
      id: count++,
      data: data,
    },
  }
}

export const deleteTask = (id) => {
  return {
    type: 'DELETE_TASK',
    id,
  }
}
