import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
    Typography, 
    Grid,
    Button
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import ToDo from './ToDo'
import NewToDo from './NewToDo'


const useStyles = makeStyles((theme) => ({
  cardDetails: {
    marginTop: '15px'
  },
  addButton: {
      color: '#fb8500',
      marginLeft: '10px',
      fontSize: '0.7em'
  }
}))

const ToDos = inject('user')(observer((props) => {  
    
    const classes = useStyles()

    const [openNew, setOpenNew] = useState(false)

    const { user, toDos, property } = props

    const handleOpenNewTask = () => {
        setOpenNew(true);
      }
    
    const handleClose = () => {
        setOpenNew(false);
    }

    const handleSubmitTodo = async function(todo) {
        user.addNewTodo(property.id, todo)
        handleClose()
    }

    return (
        <Fragment>
            <Grid item xs={12} container direction='row' >
               <Typography variant='h6'>
                    Open tasks 
                </Typography>
                <Button className={classes.addButton} onClick={handleOpenNewTask}>NEW TASK</Button> 
            </Grid>
            {toDos.map(t => <ToDo key={t.id} task={t} property={property}/>)}
            <NewToDo 
                open={openNew} 
                handleClose={handleClose}
                handleSubmitTodo={handleSubmitTodo}
                property={property}
            />
        </Fragment>
    )
}))

export default ToDos