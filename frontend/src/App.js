import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage"
import Login from './pages/Login';
import Signup from './pages/Signup';
import "./App.css"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
