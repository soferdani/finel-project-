import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'static',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

export default function AddButtun(props) {

  const classes = useStyles();

  const handleOpenAddDialog = () => {
    props.handleOpenAddDialog()
  }

  return (
    <Tooltip 
      title="Add Property" 
      aria-label="Add Property"
      onClick={handleOpenAddDialog}>
      <Fab color="secondary" className={classes.absolute}>
        <AddIcon />
      </Fab>
    </Tooltip>
  );
}
