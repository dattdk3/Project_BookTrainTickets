// ** React Imports
import { ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { ThemeColor } from '@/@core/layouts/types'
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined"; // Styled Grid component
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import SellIcon from "@mui/icons-material/Sell";
import CommuteIcon from "@mui/icons-material/Commute";
import theme from '@/app/theme'

interface DataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
}

const salesData: DataType[] = [
  {
    stats: '245k',
    title: 'Lượng người dùng',
    color: 'primary',
    icon: <PeopleAltOutlinedIcon sx={{ fontSize: '2rem' }} />
  },
  {
    stats: '12.5k',
    title: 'Nhà xe hoạt động',
    color: 'success',
    icon: <DirectionsBusIcon sx={{ fontSize: '2rem' }} />
  },
  {
    stats: '1.54k',
    color: 'warning',
    title: 'Tổng doanh thu',
    icon: <SellIcon sx={{ fontSize: '2rem' }} />
  },
  {
    stats: '$88k',
    color: 'info',
    title: 'Tổng số chuyến xe',
    icon: <CommuteIcon sx={{ fontSize: '2rem' }} />
  }
]

const renderStats = () => {
  return salesData.map((item: DataType, index: number) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 60,
            height: 60,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6'>{item.title}</Typography>
          <Typography variant='h5'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = () => {
  return (
    <Card>
      <CardHeader
        title='Tổng quan'
        subheader={
          <Typography variant='h6'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Dữ liệu tổng hợp trong tháng {new Date().getMonth()}/{new Date().getFullYear()}
            </Box>
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            mt: 1,
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontSize: 24,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
