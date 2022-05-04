const initialData = {
  list: [],
}
const reducer = (state = initialData, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const { id, data } = action.payload
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            data: data,
          },
        ],
      }
    case 'DELETE_TASK':
      const newList = state.list.filter((tl) => tl.id !== action.id)
      return {
        ...state,
        list: newList,
      }
    default:
      return state
  }
}

export default reducer
