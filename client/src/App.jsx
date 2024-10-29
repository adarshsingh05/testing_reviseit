
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/landingpage'
import UploadPage from './pages/uploadpage'
import ViewPapers from './pages/viewPapers'
import Motivation from './components/Motivation'
import SubjectsPage from './pages/card1'
import SignUp from './pages/sighnUp'
import Login from './pages/Login'


const router = createBrowserRouter([
  {
    
    children:[
      {
        path: '/',
        element: <LandingPage/>
      },
      {
        path: '/signUp',
        element: <SignUp/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/viewpapers',
        element: <ViewPapers/>
      },
      {
        path: '/csfundamentals',
        element: <SubjectsPage/>
      },
      
      {
        path: '/upload',
        element: <UploadPage/>
      }
    ]
  }
])
function App() {

    return <RouterProvider router={router}/>
  
}

export default App
