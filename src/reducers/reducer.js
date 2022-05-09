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
            completed: false,
            subList: [],
          },
        ],
      }
    case 'ADD_SUB_TASK':
      const { sId, sData } = action.payload
      return {
        ...state,
        list: [
          ...state.list,

          {
            subList: [
              {
                sId: sId,
                sData: sData,
                sSubmitted: '',
              },
            ],
          },
        ],
      }
    case 'DELETE_TASK':
      const newList = state.list.filter((tl) => tl.id !== action.id)
      return {
        ...state,
        list: newList,
      }
    case 'DELETE_SUB_TASK':
      const newSList = state.list.subList.filter((sl) => sl.sId !== action.sId)
      return {
        ...state,
        subList: newSList,
      }

    default:
      return state
  }
}

export default reducer
