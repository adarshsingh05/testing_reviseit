import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/landingpage';
import UploadPage from './pages/uploadpage';
import ViewPapers from './pages/viewPapers';
import SubjectsPage from './pages/card1';
import SignUp from './pages/sighnUp';
import Login from './pages/Login';
import ForgetPassword from './pages/forgetpassword';
import VerificationPage from './pages/verificationPage';
import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard';

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/verifycode' replace />;
  }

  return children; // Render the children if authenticated and verified
};

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />;
  }

  return children;
};

// Define routes with protected routes applied
const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/signUp',
        element: (
          <RedirectAuthenticatedUser>
            <SignUp />
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path: '/login',
        element: (
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path: '/upload',
        element: (
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/viewpapers',
        element: (
          <ProtectedRoute>
            <ViewPapers />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      { path: '/', element: <LandingPage /> },
      { path: '/forgetpassword', element: <ForgetPassword /> },
      { path: '/verifycode', element: <VerificationPage /> },
      { path: '/csfundamentals', element: <SubjectsPage /> },
    ],
  },
]);

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  // Call checkAuth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  return <RouterProvider router={router} />;
}

export default App;
