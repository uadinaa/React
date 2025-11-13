import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppGallery from './components/AppGallery.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import NotFoundPage from "./pages/NotFoundPage.jsx";
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Gallery from "./pages/Gallery.jsx";
import ArtworkDetails from "./pages/ArtworkDetails.jsx";
import App from "./components/App.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // This is our layout (includes Header + Outlet)
        children: [
            { path: "/", element: <About /> },
            { path: "/about", element: <About /> },
            { path: "/login", element: <Login /> },
            { path: "/gallery", element: <AppGallery /> },
            {path: "*", element: <NotFoundPage />},
            {path: "/artwork/:id", element: <ArtworkDetails />}
        ],
    },
    { path: "*", element: <NotFoundPage /> },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
