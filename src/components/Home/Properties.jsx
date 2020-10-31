import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import PropertyCard from './propertyCard'
import PropertyDetails from './PropertyDetails/PropertyDetails'

const Properties = inject('user')(observer((props) => {  

    const { user, match } = props

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