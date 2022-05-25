import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteTask,
  addChildList,
  deleteChildTask,
  addActionComplete,
  addActionInComplete,
  addChildActionComplete,
  addChildActionInComplete,
} from '../actions/list'
import { styled } from '@mui/material/styles'

import EditTask from '../components/EditTask'
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Card,
  CardActions,
  CardContent,
  Typography,
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faAngleDown,
  faEdit,
  faTrash,
} from '@fortawesome/fontawesome-free-solid'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))
const TodoTasks = () => {
  const dispatch = useDispatch()
  const [subTask, setSubTask] = useState('')
  const [completed, setCompleted] = useState(false)
  const [childCompleted, setChildCompleted] = useState(false)
  const lists = useSelector((state) => state.rootReducers.reducer.lists)

  const [expanded, setExpanded] = useState()
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <div>
      {/* Main Tasks Display  */}
      {lists.map((parentTaskList) => {
        return (
          <>
            <Card key={parentTaskList.id} sx={{ width: 300, minHeight: 20 }}>
              <CardContent>
                <FormControlLabel
                  label={parentTaskList.name}
                  control={
                    <Checkbox
                      checked={parentTaskList.completed}
                      onClick={(e) => {
                        e.preventDefault()
                        setCompleted(!completed)
                        !parentTaskList.completed
                          ? dispatch(
                              addActionComplete({
                                parentId: parentTaskList.id,
                              })
                            )
                          : dispatch(
                              addActionInComplete({
                                parentId: parentTaskList.id,
                              })
                            )
                      }}
                    />
                  }
                />
                <IconButton aria-label="delete">
                  <FontAwesomeIcon icon={faEdit} style={{ maxWidth: '18px' }} />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    dispatch(deleteTask({ parentId: parentTaskList.id }))
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ maxWidth: '15px' }}
                  />
                </IconButton>
              </CardContent>
              {/* Child Tasks Sections */}
              <CardActions disableSpacing>
                <Typography paragraph className="fclass">
                  {/* {complete} of {count} completed{' '} */}
                  Sub-Tasks
                </Typography>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </ExpandMore>
              </CardActions>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                {parentTaskList.sublist.map((childTaskList) => {
                  return (
                    <CardContent>
                      <FormControlLabel
                        label={childTaskList.name}
                        control={
                          <Checkbox
                            checked={childTaskList.completed}
                            onClick={(e) => {
                              e.preventDefault()
                              setChildCompleted(!childCompleted)
                              !childTaskList.completed
                                ? dispatch(
                                    addChildActionComplete({
                                      parentId: parentTaskList.id,
                                      childId: childTaskList.id,
                                    })
                                  )
                                : dispatch(
                                    addChildActionInComplete({
                                      parentId: parentTaskList.id,
                                      childId: childTaskList.id,
                                    })
                                  )
                            }}
                          />
                        }
                      />
                      <IconButton aria-label="delete">
                        <FontAwesomeIcon
                          icon={faEdit}
                          style={{ maxWidth: '18px' }}
                        />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          dispatch(
                            deleteChildTask({
                              parentId: parentTaskList.id,
                              childId: childTaskList.id,
                            })
                          )
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ maxWidth: '15px' }}
                        />
                      </IconButton>
                    </CardContent>
                  )
                })}

                <CardContent>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '18ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => {
                      e.preventDefault()
                      dispatch(
                        addChildList({
                          parentId: parentTaskList.id,
                          name: subTask,
                        }),
                        setSubTask('')
                      )
                    }}
                  >
                    <Tooltip
                      title="Tasks Should be of 30 Characters Only!"
                      placement="top"
                    >
                      <TextField
                        id="outlined-name"
                        color="success"
                        label="Sub-Tasks"
                        value={subTask}
                        onChange={(e) => setSubTask(e.target.value)}
                      />
                    </Tooltip>
                  </Box>
                </CardContent>
              </Collapse>
            </Card>
            <br />
          </>
        )
      })}
    </div>
  )
}

export default TodoTasks
