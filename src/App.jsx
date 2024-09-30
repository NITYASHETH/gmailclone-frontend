import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Inbox from './components/Inbox';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Body from './components/Body';
import Mail from './components/Mail';
import SendEmail from './components/SendEmail';
import Login from './components/Login';
import Signup from './components/Signup';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, clearAuthUser } from './redux/appSlice';

const AuthenticatedLayout = ({ children }) => {
  const { user } = useSelector((store) => store.app);

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if user is not authenticated
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div>{children}</div>
      <div className="absolute w-[30%] bottom-0 right-20 z-10">
        <SendEmail />
      </div>
    </>
  );
};

// Logout function
const handleLogout = (dispatch) => {
  localStorage.removeItem('user'); // Clear user from localStorage
  dispatch(clearAuthUser()); // Clear user from Redux
};

const approuter = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticatedLayout>
        <Body />
      </AuthenticatedLayout>
    ),
    children: [
      {
        path: "/",
        element: <Inbox />
      },
      {
        path: "/mail/:id",
        element: <Mail />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(setAuthUser(JSON.parse(user))); // Set user in Redux from localStorage
    }
  }, [dispatch]);

  return (
    <div className="bg-[#F6F8FC] h-screen">
      <RouterProvider router={approuter} />
      <Toaster />
    </div>
  );
}

export default App;
