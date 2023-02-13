import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteCreatorHub from './components/NoteCreator/NoteCreatorHub'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NoteCreatorHub />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
