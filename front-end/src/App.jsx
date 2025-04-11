import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../../front-end/src/components/Login/index.jsx'
import Register from '../../front-end/src/components/Register/index.jsx'
import Home from './components/Home/index.jsx';
import Update from './components/update/index.jsx';


const App = () => ( 
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path='/update' element={<Update/>}/>
        </Routes>
    </BrowserRouter>
)

export default App
