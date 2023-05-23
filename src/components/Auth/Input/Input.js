import React from 'react'
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Input = (props) => {
    const { half, name, handleChange, label, autoFocus, type, handleShowPassword, required = true } = props

    return (
        <Grid 
            item 
            xs={12} 
            sm={half ? 6 : 12} 
        >
            <TextField 
                name={name}
                onChange={handleChange}
                variant='outlined'
                required={required}
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={
                    name === 'password' ? {
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={handleShowPassword} >
                                    {
                                        type === 'password' ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )
                                    }
                                </IconButton>
                            </InputAdornment>
                        )
                    } : {}
                }
            />
        </Grid>
    )
}

export default Input