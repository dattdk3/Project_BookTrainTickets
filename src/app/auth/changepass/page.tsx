'use client'
// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react'
import Image from "next/image";
import "./css.css";
import Logo from "@/assets/images/logo-blue.svg";

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Container, Typography } from '@mui/material'
interface State {
    password: string
    password2: string
    password3: string
    showPassword: boolean
    showPassword2: boolean
    showPassword3: boolean

}
const ChangePass = () => {
    const [values, setValues] = useState<State>({
        password: '',
        password2: '',
        password3: '',
        showPassword: false,
        showPassword2: false,
        showPassword3: false
    })
    //Handle check Password now
    const handlePasswordNow = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }
    const handleClickShowPasswordNow = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }
    const handleMouseDownPasswordNow = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    // Handle Password change
    const handlePasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword2: !values.showPassword2 })
    }
    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    // Handle Confirm Password
    const handleConfirmChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }
    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showPassword3: !values.showPassword3 })
    }
    const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    return (
        <Container maxWidth="sm">
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                borderRadius={4}
                margin="5vh 0"
                sx={{ minHeight: "90vh", width: "100%", backgroundColor: "#ffffff" }} >
                <Grid item padding={2} justifySelf="flex-start">
                    <Image src={Logo} alt="Vexecucre" height={150} />
                </Grid>
                <Card>
                    <Typography fontSize={25} textAlign='center' children={'Thay đổi mật khẩu của bạn'} />
                    <Divider sx={{ margin: 0 }} />
                    <form onSubmit={e => e.preventDefault()}>
                        <CardContent>
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth type='email' label='Email' placeholder='abc@gmail.com' />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor='form-layouts-separator-password'>Mật khẩu hiện tại</InputLabel>
                                        <OutlinedInput
                                            value={values.password}
                                            label='Mật khẩu hiện tại'
                                            id='form-layouts-separator-password'
                                            onChange={handlePasswordNow('password')}
                                            type={values.showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        aria-label='toggle password visibility'
                                                        onClick={handleClickShowPasswordNow}
                                                        onMouseDown={handleMouseDownPasswordNow}
                                                    >
                                                        {values.showPassword ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor='form-layouts-separator-password-3'> Mật khẩu mới</InputLabel>
                                        <OutlinedInput
                                            value={values.password2}
                                            label='Mật khẩu mới'
                                            id='form-layouts-separator-password-2'
                                            onChange={handlePasswordChange('password2')}
                                            type={values.showPassword2 ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        aria-label='toggle password visibility'
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {values.showPassword2 ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor='form-layouts-separator-password-3'> Nhập lại mật khẩu mới</InputLabel>
                                        <OutlinedInput
                                            label=' Nhập lại mật khẩu mới'
                                            value={values.password3}
                                            id='form-layouts-separator-password-3'
                                            onChange={handleConfirmChange('password3')}
                                            type={values.showPassword3 ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        onClick={handleClickShowConfirmPassword}
                                                        onMouseDown={handleMouseDownConfirmPassword}
                                                        aria-label='toggle password visibility'
                                                    >
                                                        {values.showPassword3 ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>

                            </Grid>
                        </CardContent>
                        <Divider sx={{ margin: 0 }} />
                        <CardActions>
                            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                                Submit
                            </Button>
                            <Button size='large' color='secondary' variant='outlined'>
                                Cancel
                            </Button>
                        </CardActions>
                    </form>
                </Card>
            </Grid>
        </Container>
    )
}

export default ChangePass
