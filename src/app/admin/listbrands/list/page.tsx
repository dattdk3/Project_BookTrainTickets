'use client'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { ThemeColor } from '@/@core/layouts/types'
import { Button, CardHeader, Grid, Pagination } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
interface RowType {
    id: number,
    name: string,
    email: string,
    hotline: number
}

interface StatusObj {
    [key: string]: {
        color: ThemeColor
    }
}

const rows: RowType[] = [
    {
        id: 1,
        name: 'Nha Xe ABC',
        email: 'asdasda@gmail.com',
        hotline: 912381290
    },

]
const ListBrand = () => {
    return (
        <Card>
            <Typography children='Danh Sách Nhà Xe' textAlign='center' variant='h5' />
            <Grid px={3} textAlign='right'>
                <Button variant="contained" href='/admin/listbrands/add' >Thêm Nhà Xe</Button>
            </Grid>
            <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Tên Nhà Xe</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Số Điện Thoại</TableCell>
                            <TableCell>Sửa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: RowType) => (
                            <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.hotline}</TableCell>
                                <TableCell>
                                    <IconButton color='error' aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton color='success' aria-label="fix">
                                        <BuildCircleOutlinedIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container justifyContent="center">
                <Pagination count={10} variant="outlined" color="primary" />
            </Grid>
        </Card>
    )
}

export default ListBrand
