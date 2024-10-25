
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/landingpage'
import UploadPage from './pages/uploadpage'
import ViewPapers from './pages/viewPapers'


const router = createBrowserRouter([
  {
    
    children:[
      {
        path: '/',
        element: <LandingPage/>
      },
      {
        path: '/viewpapers',
        element: <ViewPapers/>
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
