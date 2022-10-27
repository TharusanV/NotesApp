import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Box} from '@mui/material';
import { Header, Hero, Sidebar } from './components';

const App = () => {
  return (
    <Box sx={{backgroundColor: '#D3D3D3'}}>
      <Header/>
      <Sidebar/>
      <Hero/>
    </Box>
  )
}

export default App;
