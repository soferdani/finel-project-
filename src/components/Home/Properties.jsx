import React, { Fragment } from 'react'
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
import { useHistory } from 'react-router-dom'

const Properties = inject('user')(observer((props) => {  

    const { user, match } = props


    // const history = useHistory()
    // console.log(history)

    const { propertyId } = match.params

    return (
        <Fragment>
            {
                propertyId
                    ?   <PropertyDetails propertyId={propertyId} />
                    :   user.properties.map(p => <PropertyCard key={p.id} property={p} />)
            }
        </Fragment>
    )
}))

export default Properties