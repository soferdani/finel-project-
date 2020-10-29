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
    Grid,
    CardHeader,
    Divider
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: 40
    },
    padding: '20px'
  },
  img: {
      width: '400px',
      height: '350px',
      borderRadius: '5px',
      boxShadow: '0px 0px 3px black',
      marginRight: '30px' 
  },
  cardDetails: {
    marginTop: '30px'
  }
}))

const PropertyDetails = inject('user')(observer((props) => {  
    
    const classes = useStyles()

    const { user, propertyId } = props

    const property = user.properties.find(p => p.id === parseInt(propertyId))

    return (
        <Grid item xs={12} container >
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant='h3'>
                        Property Name
                    </Typography>
                    <CardHeader subheader={property.address} />
                    <Divider />
                    <Grid item xs={12} container direction='row' className={classes.cardDetails}>
                        {/* <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            className={classes.img}
                            image={property.img}
                            title="Contemplative Reptile"
                        /> 
                        <Grid>
                            <Typography variant='subtitle1'>
                                Owner
                            </Typography>
                        </Grid>  */}
                    </Grid>
                </CardContent> 
            </Card>
        </Grid>
    )
}))

export default PropertyDetails