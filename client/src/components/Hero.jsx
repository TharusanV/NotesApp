import {Box, Stack, Typography} from '@mui/material'
import Sidebar from './Sidebar'

const Hero = () => {
  return (
    <Stack sx={{flexDirection: {sx: 'column', md: 'row'}}}>
     <Box sx={{height: {sx: 'auto', md: '90vh'}}}>
        <Sidebar />

     </Box>
    </Stack>
  )
}

export default Hero