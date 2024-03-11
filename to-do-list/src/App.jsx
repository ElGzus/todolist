import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Welcome } from './components/Welcome';
import { Homepage } from './components/HomePage';

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Welcome/>} />
          <Route path='/to-do-list/src/components/HomePage.jsx' element={<Homepage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
