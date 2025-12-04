import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppGallery from './components/AppGallery.jsx';
import App from './components/App.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import ArtworkDetails from './pages/ArtworkDetails.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <About /> },
            { path: "/about", element: <About /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            },
            {
                path: "/gallery",
                element: (
                    <ProtectedRoute>
                        <AppGallery />
                    </ProtectedRoute>
                )
            },
            { path: "/artwork/:id", element: <ArtworkDetails /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
    { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);

serviceWorkerRegistration.register();