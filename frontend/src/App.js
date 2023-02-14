import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Panel from "./components/Panel";

const App = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/admin' element={<Panel/>}/>
              <Route exact path='/zaposlenik' element={<Panel/>}/>
              <Route exact path='/' element={<Navigate to='/login'/>}/>
              <Route path='*' element={<Navigate to='/login'/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
