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

const random = () => {
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
      const parentIdIndex = state.lists.findIndex(
        (data) => data.id === action.payload.parentId
      )
      return {
        ...state,
        lists: [
          ...state.lists.slice(0, parentIdIndex),
          ...state.lists.slice(parentIdIndex + 1),
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
      const parentOfChilIdIndex = state.lists.findIndex(
        (data) => data.id === action.payload.parentId
      )
      state.lists[parentOfChilIdIndex].sublist.push({
        id: random(),
        name: action.payload.name,
        completed: false,
      })
      return {
        lists: state.lists,
      }

    case DELETE_CHILD_TASK:
      const parentOfChilIdIdIndex = state.lists.findIndex(
        (data) => data.id === action.payload.parentId
      )
      const childIndex = state.lists[parentOfChilIdIdIndex].sublist.findIndex(
        (d) => d.id === action.payload.childId
      )
      state.lists[parentOfChilIdIdIndex].sublist = {
        ...state.lists[parentOfChilIdIdIndex].sublist.slice(0, childIndex),
        ...state.lists[parentOfChilIdIdIndex].sublist.slice(childIndex + 1),
      }

      return {
        ...state,
        lists: state.lists,
      }

    case ADD_CHILD_ACTION_COMPLETE:
      const parentsChildIdIndex = state.lists.findIndex(
        (data) => data.id === action.payload.parentId
      )
      const childIndexC = state.lists[parentsChildIdIndex].sublist.findIndex(
        (d) => d.id === action.payload.childId
      )
      state.lists[parentsChildIdIndex].sublist[childIndexC] = {
        ...state.lists[parentsChildIdIndex].sublist[childIndexC],
        completed: true,
      }
      return {
        ...state,
        lists: state.lists,
      }

    case ADD_CHILD_ACTION_INCOMPLETE:
      const parentsChildidIndex = state.lists.findIndex(
        (data) => data.id === action.payload.parentId
      )
      const childIndexI = state.lists[parentsChildidIndex].sublist.findIndex(
        (d) => d.id === action.payload.childId
      )
      state.lists[parentsChildidIndex].sublist[childIndexI] = {
        ...state.lists[parentsChildidIndex].sublist[childIndexI],
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
