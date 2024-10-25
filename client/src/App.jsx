
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/landingpage'


const router = createBrowserRouter([
  {
    
    children:[
      {
        path: '/',
        element: <LandingPage/>
      }
    ]
  }
])
function App() {

    return <RouterProvider router={router}/>
  
}

export default App
