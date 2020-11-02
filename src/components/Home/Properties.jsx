import React, { useState, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import PropertyCard from './propertyCard'
import PropertyDetails from './PropertyDetails/PropertyDetails'
import AddButton from './AddProperty/AddButton'
import AddProperty from './AddProperty/AddProperty'

const Properties = inject('user')(observer((props) => {

    const { user, match } = props
    const { propertyId } = match.params

    const [addDialogOpen, setAddDialogOpen] = useState(false)

    const handleOpenAddDialog = () => {
        console.log('1111');
        setAddDialogOpen(true)
    }
    const handleCloseAddDialog = () => {
        setAddDialogOpen(false)
    }

    return (
        <Fragment>
            {
                propertyId
                    ? <PropertyDetails propertyId={propertyId} />
                    : user.properties.map(p => <PropertyCard key={p.id} property={p} />)
            }
            <AddButton onClick={handleOpenAddDialog} />
            <AddProperty
                open={addDialogOpen}
                handleCloseAddDialog={handleCloseAddDialog}
            />
        </Fragment>
    )
}))

export default Properties