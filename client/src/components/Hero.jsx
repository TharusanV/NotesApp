import {Box, Stack, Typography} from '@mui/material'
import Editor from './Editor'


const Hero = () => {
  return (
    <div style={{position: 'absolute', width: '100%', display: 'inline-flex', borderLeft: '2px solid black', left: '15%', top: '52px', backgroundColor: '#D3D3D3'}}>
      <div style={{backgroundColor: 'white', border: '2px solid black', marginTop: '20px', marginLeft: '20px', marginRight: '20px', width: '81%', height: '90%'}}>
        <div style={{margin: '5px', display: 'flex', justifyContent: 'center'}}>
          <Editor/>
        </div>
      </div>
    </div>
  )
}

export default Hero