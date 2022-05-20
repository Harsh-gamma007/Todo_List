import {
  GET_LISTS,
  ADD_PARENT_LIST,
  ADD_CHILD_LIST,
  DELETE_TASK,
  DELETE_CHILD_TASK,
  ADD_ACTION_COMPLETE,
  ADD_ACTION_INCOMPLETE,
  ADD_CHILD_ACTION_COMPLETE,
  ADD_CHILD_ACTION_INCOMPLETE,
} from '../const'

const initialStates = {
  lists: [],
}

var random = () => {
  return Math.random().toString(36).substr(2, 3)
}

const reducer = (state = initialStates, action) => {
  switch (action.type) {
    case GET_LISTS:
      return {
        lists: state.lists,
      }

    //Reducers for parents

    case ADD_PARENT_LIST:
      const item = {
        id: random(),
        name: action.payload.name,
        completed: false,
        sublist: [],
      }
      return {
        ...state,

        lists: [...state.lists, item],
      }

    case DELETE_TASK:
      const pIdIndex = state.lists.findIndex(
        (data) => data.id === action.payload.parentId
      )
      return {
        ...state,
        lists: [
          ...state.lists.slice(0, pIdIndex),
          ...state.lists.slice(pIdIndex + 1),
        ],
      }

    case ADD_ACTION_COMPLETE:
      const parentIndex = state.lists.findIndex(
        (data) => data.id === action.payload.parentId
      )
      state.lists[parentIndex] = {
        ...state.lists[parentIndex],
        completed: !state.lists[parentIndex].completed,
      }
      return {
        ...state,
        lists: state.lists,
      }

    case ADD_ACTION_INCOMPLETE:
      const parentIndexIn = state.lists.findIndex(
        (data) => data.id === action.payload.parentId
      )
      state.lists[parentIndexIn] = {
        ...state.lists[parentIndexIn],
        completed: false,
      }

      return {
        lists: state.lists,
      }

    // Reducers for sublist / child
    case ADD_CHILD_LIST:
      const parentIdIndex = state.lists.findIndex(
        (data) => data.id === action.payload.parentId
      )
      state.lists[parentIdIndex].sublist.push({
        id: random(),
        name: action.payload.name,
        completed: false,
      })
      return {
        lists: state.lists,
      }

    case DELETE_CHILD_TASK:
      const pidIndex = state.lists.findIndex(
        (data) => data.id === action.payload.parentId
      )
      const childIndex = state.lists[pidIndex].sublist.findIndex(
        (d) => d.id === action.payload.childId
      )
      console.log(childIndex)
      state.lists[pidIndex].sublist = {
        ...state.lists[pidIndex].sublist.slice(0, childIndex),
        ...state.lists[pidIndex].sublist.slice(childIndex + 1),
      }

      return {
        ...state,
        lists: state.lists,
      }

    case ADD_CHILD_ACTION_COMPLETE:
      const parentCIndex = state.lists.findIndex(
        (data) => data.id === action.payload.parentId
      )
      const childIndexC = state.lists[parentCIndex].sublist.findIndex(
        (d) => d.id === action.payload.childId
      )
      state.lists[parentCIndex].sublist[childIndexC] = {
        ...state.lists[parentCIndex].sublist[childIndexC],
        completed: true,
      }
      return {
        ...state,
        lists: state.lists,
      }

    case ADD_CHILD_ACTION_INCOMPLETE:
      const parentIIndex = state.lists.findIndex(
        (data) => data.id === action.payload.parentId
      )
      const childIndexI = state.lists[parentIIndex].sublist.findIndex(
        (d) => d.id === action.payload.childId
      )
      state.lists[parentIIndex].sublist[childIndexI] = {
        ...state.lists[parentIIndex].sublist[childIndexI],
        completed: false,
      }
      return {
        ...state,
        lists: state.lists,
      }

    default:
      return state
  }
}
export default reducer
