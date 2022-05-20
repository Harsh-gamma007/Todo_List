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
} from '../actions/index'
import { styled } from '@mui/material/styles'
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

import { faAngleDown, faTrash } from '@fortawesome/fontawesome-free-solid'

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
  const [ccompleted, setcCompleted] = useState(false)
  const list = useSelector((state) => state.rootReducers.reducer.lists)

  const [expanded, setExpanded] = useState()
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <div>
      {/* Main Tasks Display  */}
      {list.map((tl) => {
        return (
          <>
            <Card key={tl.id} sx={{ width: 300, minHeight: 20 }}>
              <CardContent>
                <FormControlLabel
                  label={tl.name}
                  control={
                    <Checkbox
                      checked={tl.completed}
                      onClick={(e) => {
                        e.preventDefault()
                        setCompleted(!completed)
                        !tl.completed
                          ? dispatch(addActionComplete({ parentId: tl.id }))
                          : dispatch(addActionInComplete({ parentId: tl.id }))
                      }}
                    />
                  }
                />

                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    dispatch(deleteTask({ parentId: tl.id }))
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
                {tl.sublist.map((sl) => {
                  return (
                    <CardContent>
                      <FormControlLabel
                        label={sl.name}
                        control={
                          <Checkbox
                            checked={sl.completed}
                            onClick={(e) => {
                              e.preventDefault()
                              setcCompleted(!ccompleted)
                              !sl.completed
                                ? dispatch(
                                    addChildActionComplete({
                                      parentId: tl.id,
                                      childId: sl.id,
                                    })
                                  )
                                : dispatch(
                                    addChildActionInComplete({
                                      parentId: tl.id,
                                      childId: sl.id,
                                    })
                                  )
                            }}
                          />
                        }
                      />
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          dispatch(
                            deleteChildTask({
                              parentId: tl.id,
                              childId: sl.id,
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
                        addChildList({ parentId: tl.id, name: subTask }),
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
