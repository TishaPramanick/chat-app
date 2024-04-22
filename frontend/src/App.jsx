import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Chat from './pages/Chat'



function App() {
  return(
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/chat' element={<Chat/>}></Route>
    </Routes>
    </>
  )
}

export default App
