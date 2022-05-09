import React, { useState } from 'react'
import '../styles.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTask,
  deleteTask,
  addSubTask,
  deleteSubTask,
} from '../actions/index'
import { styled } from '@mui/material/styles'
import {
  Box,
  Button,
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

const Todo = () => {
  const [task, setTask] = useState('')
  const [subTask, setSubTask] = useState('')
  const list = useSelector((state) => state.rootReducers.reducer.list)
  // const subList = useSelector((state) => state.rootReducers.reducer.subList)

  const dispatch = useDispatch()

  //Display Elements
  const [checked, setChecked] = useState([])

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked])
    // dispatch
  }

  // const handleChange2 = (event) => {
  //   setChecked([event.target.checked, checked[1]])
  // }

  // const handleChange3 = (event) => {
  //   setChecked([checked[0], event.target.checked])
  // }

  const [expanded, setExpanded] = useState()
  // const [count, setCount] = useState(0)
  // const [complete, setComplete] = useState(0)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  // const handleChildSubmit = (e) => {
  //   e.preventDefault()
  //   alert('child SUbmitted!')
  // }
  return (
    <>
      <div style={{ paddingBottom: '20px' }}>
        {/* Main Tasks form */}
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault()
            dispatch(addTask(task), setTask(''))
          }}
        >
          <Tooltip
            title="Tasks Should be of 30 Characters Only!"
            placement="top"
          >
            <TextField
              id="outlined-name"
              color="success"
              label="Tasks"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </Tooltip>

          <br />
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="small"
          >
            ➕ Add
          </Button>
        </Box>
      </div>
      {/* Main Tasks Display  */}
      {list.map((tl) => {
        return (
          <>
            <Card key={tl.id} sx={{ width: 300, minHeight: 20 }}>
              <CardContent>
                <FormControlLabel
                  label={tl.data}
                  control={
                    <Checkbox indeterminate={checked[0] !== checked[1]} />
                  }
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    dispatch(deleteTask(tl.id))
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
                {tl.subList.map((sl) => {
                  return (
                    <CardContent>
                      <FormControlLabel
                        label={sl.sData}
                        control={
                          <Checkbox
                            indeterminate={checked[0] !== checked[1]}
                            onChange={handleChange1}
                            key={sl.sId}
                          />
                        }
                      />
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          dispatch(deleteSubTask(sl.sId))
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
                      dispatch(addSubTask(subTask), setSubTask(''))
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
    </>
  )
}
export default Todo
