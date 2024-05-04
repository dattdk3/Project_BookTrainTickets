'use client'
// ** React Imports
import { ChangeEvent, MouseEvent, useState, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'



const AddBrand = () => {
    return (
        <Card>
            <CardHeader title='Thêm Nhà Xe' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form onSubmit={e => e.preventDefault()}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Tên' placeholder='VD: Nhà Xe ABC' />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type='email'
                                label='Email'
                                placeholder='abc@gmail.com'
                                helperText='Chỉ dùng chữ cái, số và dấu chấm'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type='number' fullWidth label='Số Điện Thoại' placeholder='VD: 0987654321' />
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    gap: 5,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Button type='submit' variant='contained' size='large'>
                                    Thêm
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    )
}

export default AddBrand
