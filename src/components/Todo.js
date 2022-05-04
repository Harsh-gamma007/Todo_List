import React, { useState } from 'react'
import '../styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteTask, deleteAllTasks } from '../actions/index'
import { styled } from '@mui/material/styles'
import {
  Box,
  Button,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  FormControl,
  Paper,
  createTheme,
  ThemeProvider,
  Card,
  CardActions,
  CardContent,
  Typography,
  Collapse,
  IconButton,
  Tooltip,
  InputBase,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faAngleDown,
  faArrowDown,
  faCheckSquare,
  faCoffee,
  faPlus,
  faPlusSquare,
  faTrash,
} from '@fortawesome/fontawesome-free-solid'

const lightTheme = createTheme({ palette: { mode: 'light' } })

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
  const list = useSelector((state) => state.rootReducers.reducer.list)

  const dispatch = useDispatch()

  //Display Elements
  const [checked, setChecked] = useState([])

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked])
  }

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]])
  }

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked])
  }
  // const bull = (

  // //   <Box
  // //     component="span"
  // //     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  // //   >
  // //     •
  // //   </Box>
  // // )

  // const children = (
  //   <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
  //     <FormControlLabel
  //       label="Child 1"
  //       control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
  //     />
  //     <FormControlLabel
  //       label="Child 2"
  //       control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
  //     />
  //   </Box>
  // )
  const [expanded, setExpanded] = useState(false)
  const [count, setCount] = useState(0)
  const [complete, setComplete] = useState(0)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const handleChildSubmit = (e) => {
    e.preventDefault()
    alert('child SUbmitted!')
  }
  return (
    <>
      <div style={{ paddingBottom: '20px' }}>
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

      {list.map((tl) => {
        return (
          <>
            <Card sx={{ width: 300, minHeight: 20 }} key={tl.id}>
              <CardContent>
                <FormControlLabel
                  label={tl.data}
                  control={
                    <Checkbox
                      indeterminate={checked[0] !== checked[1]}
                      onChange={handleChange1}
                    />
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
                <FormControl variant="standard">
                  {/* <Typography paragraph>{elem.data}</Typography> */}
                </FormControl>
              </CardContent>
              <CardActions disableSpacing>
                <Typography paragraph className="fclass">
                  {complete} of {count} completed{' '}
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
                <CardContent>
                  <Typography paragraph>
                    <Paper
                      component="form"
                      sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 260,
                      }}
                    >
                      {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <MenuIcon />
                      </IconButton> */}
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Sub Tasks"
                        inputProps={{ 'aria-label': 'Sub Tasks' }}
                      />
                      <IconButton
                        type="submit"
                        sx={{ p: '10px' }}
                        aria-label="search"
                        onClick={handleChildSubmit}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </IconButton>
                      {/* <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                      <IconButton
                        color="primary"
                        sx={{ p: '10px' }}
                        aria-label="directions"
                      >
                        <DirectionsIcon />
                      </IconButton> */}
                    </Paper>
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
            <br />
          </>

          // <ThemeProvider theme={lightTheme} key={elem.id}>
          //   <Box
          //     sx={{
          //       display: 'flex',
          //       '& > :not(style)': {
          //         m: 1,
          //         width: 250,
          //         height: 128,
          //       },
          //     }}
          //   >
          //     <Paper elevation={12} xs={8}>
          //       <div style={{ paddingLeft: '20px', minWidth: '20px' }}>
          //         <FormControlLabel
          //         label={elem.data}
          //         control=
          //         {
          //           <Checkbox
          //             checked={checked[0] && checked[1]}
          //             indeterminate={checked[0] !== checked[1]}
          //             onChange={handleChange1}
          //           />
          //         }
          //         />
          //         {/* {children} */}
          //       </div>
          //     </Paper>
          //   </Box>
          // </ThemeProvider>
        )
      })}
    </>
  )
}
export default Todo
