import React, { useEffect, useState } from 'react'
import { Avatar, Typography, Grid, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import { GoogleLogin } from '@react-oauth/google'
import { googleLogin, login, register } from '../../store/actions/auth.actions'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import useStyles from './styles'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const Auth = () => {
    const classes = useStyles()
    const dispath = useDispatch()
    const navigate = useNavigate()
    const { authenticate } = useSelector(state => state.auth)
    
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState({})
    const [formErrors, setFormErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [isNickName, setNickName] = useState(false)
    const [isGoogleLogin, setGoogleLogin] = useState(false)

    useEffect(() => {
        if(authenticate) {
            navigate("/")
        }
    }, [authenticate, navigate])


    const handleSubmit = (e) => {
        e?.preventDefault()

        setFormErrors({})
        
        if (isGoogleLogin) {
            dispath(googleLogin(formData, isNickName, setNickName, setFormErrors))
        } else if (isSignUp) {
            dispath(register(formData, setFormErrors))
        } else {
            dispath(login(formData, setFormErrors))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const switchAuthMode = () => {
        setFormErrors({})
        setIsSignUp(prev => !prev)
    }

    const googleSuccess = async (res) => {
        try {
            const userData = {
                clientId: res?.clientId,
                credentials: jwtDecode(res?.credential)
            }

            setGoogleLogin(true)
            setFormData(userData)
            dispath(googleLogin(userData, isNickName, setNickName))
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = () => {
        console.log(`Google 'Sing In' was unsuccessful. Try again later.`)
    }

    return (
        <div
            className='auth-container'
            maxWidth='xs'
        >
            <div className='paper'>
                
                {
                    !isNickName && (
                        <div className='logo'>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography variant='h5'>
                                {
                                    isSignUp ? 'Sign Up' :  'Sing In'
                                }
                            </Typography>
                        </div>
                    )
                }
                <form 
                    className={classes.form}
                    onSubmit={handleSubmit}
                >
                
                    {
                        isNickName ? (
                            <>
                                <Input
                                    name='nickName'
                                    label='Nick Name'
                                    handleChange={handleChange}
                                    autoFocus
                                />
                                <div className='form-error'>{ formErrors.nickName }</div>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    className={classes.submit}
                                >
                                    {
                                        isSignUp ? 'Sign Up' :  'Sing In'
                                    }
                                </Button>
                            </>
                        ) : (
                            <>
                                <Grid
                                    container
                                    spacing={2}
                                >
                                    {
                                        isSignUp && (
                                            <>
                                                <Input
                                                    name='firstName'
                                                    label='First Name'
                                                    handleChange={handleChange}
                                                    autoFocus
                                                    half
                                                />
                                                <Input
                                                    name='lastName'
                                                    label='Last Name'
                                                    handleChange={handleChange}
                                                    half
                                                />
                                                <Input
                                                    name='nickName'
                                                    label='Nick Name'
                                                    required={false}
                                                    handleChange={handleChange}
                                                />
                                                <div className='form-error'>{ formErrors.nickName }</div>
                                            </>
                                        )
                                    }
                                    <Input
                                        name='email'
                                        type='email'
                                        label='Email Address'
                                        handleChange={handleChange}
                                    />
                                    <div className='form-error'>{ formErrors.email }</div>
                                    <Input
                                        name='password'
                                        type={showPassword ? 'text' : 'password'}
                                        label='Password'
                                        handleChange={handleChange}
                                        handleShowPassword={handleShowPassword}
                                    />
                                    <div className='form-error'>{ formErrors.password }</div>
                                    {
                                        isSignUp && (
                                            <>
                                                <Input 
                                                    name='confirmPassword'
                                                    type={showPassword ? 'text' : 'password'}
                                                    label='Confirm Password'
                                                    handleChange={handleChange}
                                                />
                                                <div className='form-error'>{ formErrors.confirmPassword }</div>
                                            </>
                                        )
                                    }
                                </Grid>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    className={classes.submit}
                                >
                                    {
                                        isSignUp ? 'Sign Up' :  'Sing In'
                                    }
                                </Button>
                                <GoogleLogin 
                                    className={classes.googleButton}
                                    onSuccess={googleSuccess}
                                    onFailure={googleFailure}
                                />
                                <Grid
                                    container
                                    justifyContent='flex-end'
                                >
                                    <Grid item>
                                        <Button onClick={switchAuthMode} >
                                            {
                                                isSignUp ? 'Already have an account? Sign In' 
                                                :  `Don't have an account? Sing Up`
                                            }
                                        </Button>
                                    </Grid>
                                </Grid>
                            </>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default Auth