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
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '30px',
    [theme.breakpoints.up('sm')]: {
        marginLeft: 40
    },
  },
  link: {
    textDecoration: 'none'
  },
  cardTitle: {
      marginBottom: '30px'
  }
}))

const PropertyCard = inject('user')(observer((props) => {  
    
    const classes = useStyles()

    const { property } = props

    return (
        <Grid item xs={12} md={4} container >
            <Link to={`/home/properties/${property.id}`} className={classes.link}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="180"
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
            </Link>
        </Grid>
    )
}))

export default PropertyCard