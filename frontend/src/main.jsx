import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.jsx';
import Home from './pages/home.jsx';
import Allservice from './pages/allservices.jsx';
import ServiceDetail from "./pages/servicesDetail.jsx";
import MyBooking from "./pages/mybooking.jsx";

import Ownerlayout from './pages/owner/ownerlayout.jsx';
import DashBorad from './pages/owner/dashboard.jsx';
import Service from './pages/owner/jetskiiservices.jsx';
import ServiceForm from './pages/owner/serviceForm.jsx';

import { AppProvider } from "./context/AppContext.jsx";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { ClerkProvider } from '@clerk/clerk-react';


// Clerk key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}


// ✅ Create Router (AppProvider wrapped INSIDE router components)
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppProvider>
        <App />
      </AppProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/allservices", element: <Allservice /> },
      { path: "/service/:id", element: <ServiceDetail /> },
      { path: "/my-booking", element: <MyBooking /> },
    ],
  },
  {
    path: "/owner",
    element: (
      <AppProvider>
        <Ownerlayout />
      </AppProvider>
    ),
    children: [
      { path: "/owner", element: <DashBorad /> },
      { path: "JetSkiiService", element: <Service /> },
      { path: "JetSkiiServiceForm", element: <ServiceForm /> },
    ],
  },
]);


// ✅ Render
createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
  </ClerkProvider>
);
