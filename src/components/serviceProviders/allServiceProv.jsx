import { Grid, makeStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        padding: '20px',
        [theme.breakpoints.up('md')]: {
            marginLeft: 180,
            paddingTop: '40px',
            padding: '30px',
        },
    }
}))

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 24),
    createData('Cupcake', 305, 3.7, 67),
    createData('Gingerbread', 356, 16.0, 49),
  ];


const AllServiceProv = inject('user')(observer((props) => {
    
    const { user } = props 
    const classes = useStyles()
    const [allUserServicers, setAllUserServicers] = useState([])


    // useEffect(() => {
    //     const getAllTypes = async () => {
    //         const userProv = user.serviceWorkers
    //         console.log(userProv);
        
    //     }
    //     getAllTypes()

    // },[])

    console.log(user.serviceWorkers[0]);





    return (
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.serviceWorkers.map((row) => (
            <TableRow key={row.firstName}>
              <TableCell component="th" scope="row">
                {row.firstName} {row.lastName}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}))

export default AllServiceProv