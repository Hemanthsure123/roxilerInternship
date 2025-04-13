import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/index.jsx';
import Register from './components/Register/index.jsx';
import Home from './components/Home/index.jsx';
import Update from './components/update/index.jsx';
import AddStore from './components/AddStore/index.jsx';
import GetUsers from './components/GetUsers/index.jsx';

const App = () => ( 
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Register/>} />  
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>} />
            <Route exact path='/update' element={<Update/>}/>
            <Route exact path='/addstore' element={<AddStore/>} />
            <Route exact path='/getuser' element={<GetUsers/>} />
        </Routes>
    </BrowserRouter>
)

export default App
