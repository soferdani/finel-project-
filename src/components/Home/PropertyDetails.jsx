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


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '30px',
    [theme.breakpoints.up('sm')]: {
        marginLeft: 40
    },
  },
  img: {
      height: '60%'
  }
}))

const PropertyDetails = inject('user')(observer((props) => {  
    
    const classes = useStyles()

    const { user, property } = props


    return (
        <Grid item xs={12} container >
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        className={classes.img}
                        image={property.img}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography 
                            gutterBottom 
                            variant="h5" 
                            component="h2"
                            className={classes.cardTitle}
                        >
                            Property Name
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {property.address}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}))

export default PropertyDetails