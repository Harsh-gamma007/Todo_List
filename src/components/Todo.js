import React, { useState } from 'react'
import '../styles.css'
import TodoTasks from './TodoTasks'
import { useDispatch } from 'react-redux'
import { addParentList } from '../actions/index'
import { Box, Button, TextField, Tooltip } from '@mui/material'

const Todo = () => {
  const [task, setTask] = useState('')
  const dispatch = useDispatch()

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
            dispatch(addParentList({ name: task }), setTask(''))
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
      <TodoTasks />
    </>
  )
}
export default Todo
