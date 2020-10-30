import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
    Card, 
    CardActionArea, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Button,
    Typography, 
    Grid
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import PropertyCard from './propertyCard'
import PropertyDetails from './PropertyDetails'


const useStyles = makeStyles((theme) => ({
    homeContainer: {
        padding: '20px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 160,
            paddingTop: '40px',
            padding: '30px',
        },
    },
}))

const Properties = inject('user')(observer((props) => {  
    
    const classes = useStyles()

    const { user, match } = props
    // console.log(user)

    const { propertyId } = match.params


    return (
        <Grid 
            item 
            xs={12} 
            container 
            className={classes.homeContainer} 
        >
            {
                propertyId
                    ?   <PropertyDetails propertyId={propertyId} />
                    :   user.properties.map(p => <PropertyCard key={p.id} property={p} />)
            }
        </Grid>
    )
}))

export default Properties