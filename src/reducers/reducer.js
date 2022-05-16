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
    case 'Task_Completed':
      const newLlist = state.list.filter((tl) => (tl.completed = true))
      return {
        ...state,
        list: newLlist,
      }

    case 'Task_Incompleted':
      const newlist = state.list.filter((tl) => (tl.completed = false))
      return {
        ...state,
        list: newlist,
      }
    // const { completed } = action.payload
    // return {
    //   ...state,
    //   list: [
    //     ...state.list,
    //     {
    //       completed: completed,
    //     },
    //   ],
    // }
    case 'ADD_SUB_TASK':
      const newSsist = state.subList.filter((i) => i.id === action.id)
      // const newSist = [...state.subList]
      return {
        ...state,
        list: [
          ...state.list,
          {
            subList: [
              {
                subList: newSsist,
              },
            ],
          },
        ],
      }
    // state.list.filter((i) => i.id === action.id)
    // const { sId, sData } = action.payload
    // return {
    //   ...state,
    //   list: [
    //     ...state.list,
    //     {
    //       subList: [
    //         ...state.subList,
    //         {
    //           sId: sId,
    //           sData: sData,
    //           sCompleted: false,
    //         },
    //       ],
    //     },
    //   ],
    // }

    // const check = (t) =>{ (t.id === action.id) ?
    //   const { sId, sData } = action.payload
    //   return {
    //     ...state,
    //     list: [
    //       ...state.list,
    //       {
    //         subList: [
    //           {
    //             sId: sId,
    //             sData: sData,
    //             completed: false,
    //           },
    //         ],
    //       },
    //     ],
    //   } : return state
    // }
    //   const { sId, sData } = action.payload
    //   state.list.sublist.push(action.payload)
    //   return state

    // const { sId, sData } = action.payload
    // return {
    //   ...state,
    //   list: [
    //     ...state.list,
    //     {
    //       subList: [
    //         {
    //           sId: sId,
    //           sData: sData,
    //           completed: false,
    //         },
    //       ],
    //     },
    //   ],
    // }
    // case 'COMPLETE_TASK':
    //   state.list.filter((t) => t.id === action.id)
    //   return {
    //     ...state,
    //     list: [
    //       ...state.list,
    //       {
    //         completed: true,
    //       },
    //     ],
    //   }

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
