import {Box, Stack, Typography} from '@mui/material'

const Header = () => {
  return (
    <Stack
    direction='row' alignItems='center' justifyContent='center'
    sx={{position: 'sticky', backgroundColor: 'white'}}
    >
        <Typography
        variant='h2'
        >
            Notes
        </Typography>
    </Stack>
  )
}

export default Header