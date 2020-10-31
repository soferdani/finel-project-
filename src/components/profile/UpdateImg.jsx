import { inject, observer } from 'mobx-react'
import React from 'react'
import { TextField, makeStyles, Button, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles({
    profilePicture: {
        width: '80%',
        height: '60%'
    },
    imgInput: {
        margin: 8
    }
})

const UpdateImg = inject('user')(observer((props) => {
    const { user } = props
    const classes = useStyles()


    return (
        <>
            <Typography variant='h5'>
                Profile Picture
            </Typography>
            <Grid item xs={12} container>

                <Grid xs>
                    <img className={classes.profilePicture} src={user.img} />
                </Grid>

                <Grid xs>
                    <TextField
                        name="img"
                        value={props.value}
                        label="Image"
                        className={classes.imgInput}
                        placeholder="Image URL"
                        helperText="Please enter new image address"
                        fullWidth
                        multiline
                        rows={15}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={props.handleFieldChange}
                    />

                    <Button
                        disabled={!props.value.length > 0}
                        onClick={() => props.handleSubmit(['img'])}>Upload
                </Button>

                </Grid>

            </Grid>
        </>
    )

}))

export default UpdateImg