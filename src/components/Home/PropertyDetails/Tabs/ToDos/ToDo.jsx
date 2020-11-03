import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Checkbox, IconButton, makeStyles, withStyles, Typography } from '@material-ui/core'
import {
    Delete as DeleteIcon, 
    RadioButtonUnchecked as RadioButtonUncheckedIcon, 
    CheckCircle as CheckCircleIcon,
    ExpandMore as ExpandMoreIcon
} from '@material-ui/icons'
import { inject, observer } from 'mobx-react'
import moment from 'moment'

const DoneCheckbox = withStyles({
    root: {
    color: '#023047',
      '&$checked': {
        color: '#023047',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />)

const useStyles = makeStyles((theme) => ({
    toDoCard: {
        marginTop: '10px',
        backgroundColor: '#ffb703',
        maxWidth:'100%'
    },
    toDoComplete: {
        marginTop: '10px',
        backgroundColor: '#8ecae6',
        maxWidth:'100%'
    },
    taskContainer: {
        alignItems: 'center',
        paddingLeft: '5px'
    }
}))

const ToDo = inject('user')(observer((props) => {  
    
    const classes = useStyles()

    const { user, task, property } = props

    const serviceProvider = property.serviceWorkers.find(w => w.id === task.serviceProvider)

    const handleCheck = async function() {
        user.updateTodoStatus(property.id, task.id)
    }

    const handleDelete = async function() {
        user.deleteTodo(property.id, task.id)
    }

    return (
        <Accordion 
            className={ 
                task.complete 
                    ? classes.toDoComplete 
                    : classes.toDoCard
                }
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography 
                    className={classes.heading}
                >
                    {task.task}
                </Typography>              
            </AccordionSummary>
            <AccordionDetails>
                <Grid item xs={12} container direction='column'>
                    <Grid item xs={12} container direction='row'>
                        <DoneCheckbox 
                            onChange={handleCheck}
                            checked={task.complete}
                            className={classes.checkbox}
                            icon={<RadioButtonUncheckedIcon />} 
                            checkedIcon={<CheckCircleIcon />} 
                            name="checkedH" 
                        />
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                    <Typography variant="subtitle2">
                        Type: {task.type.type}
                    </Typography>
                    <Typography variant="subtitle2">
                        Service Provider: 
                        {serviceProvider 
                            ? ` ${serviceProvider.firstName} ${serviceProvider.lastName}`
                            : task.type.id === 1 ? ' Manager' : ' No service provider was assigned to this task'} 
                    </Typography>
                    <Typography variant="subtitle2">
                        Created in: {moment(task.date).format('DD/MM/YY')}
                    </Typography>
                </Grid> 
            </AccordionDetails>
        </Accordion> 
    )
}))

export default ToDo