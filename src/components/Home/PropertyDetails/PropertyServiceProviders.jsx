import { Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { Fragment } from 'react'

const PropertyServiceProviders = inject('user')(observer((props) => {  

    return (
        <Fragment>
            <Typography variant='h6'>
                Service Providers
            </Typography>
        </Fragment>
    )
}))

export default PropertyServiceProviders