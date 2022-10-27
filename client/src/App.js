import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Box} from '@mui/material';
import { Header, Hero } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{backgroundColor: '#D3D3D3'}}>
        <Header/>
        <Routes>
          <Route path='/' exact element={<Hero/>}/>
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App;
