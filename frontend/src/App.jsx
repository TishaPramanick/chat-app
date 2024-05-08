import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Login from './components/Login'
import SignUp from './components/SignUp'



function App() {
  return(
    <div className='App'>
    <Routes>
      <Route path='/' element={<Home/>}>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
      </Route>
      <Route path='/chat' element={<Chat/>}></Route>
    </Routes>
    </div>
  )
}

export default App
