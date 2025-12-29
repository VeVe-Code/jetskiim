import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/home.jsx'
import Allservice from './pages/allservices.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ServiceDetail from "./pages/servicesDetail.jsx"
import MyBooking from "./pages/mybooking.jsx"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
import { ClerkProvider } from '@clerk/clerk-react'
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"/allservices",
        element: <Allservice/>
      },{
        path:"/service/:id",
        element: <ServiceDetail/>
      },
      {
        path:"/my-bookings",
        element: <MyBooking/>
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router}  />
  </ClerkProvider>
 
)
