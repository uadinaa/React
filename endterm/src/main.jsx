import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import CreatingCard from "./pages/CreatingCard.jsx";
import CharacterDetails from "./pages/CharacterDetails.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Profile from "./pages/Profile.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import FavoritesList from "./pages/FavoritesList.jsx";
import CharactersList from "./pages/CharactersList.jsx";
import { register } from "./serviceWorkerRegistration";
import "./i18n";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                { path: "/", element: <Home /> },
                { path: "/characters", element: <CharactersList /> },
                { path: "/character/:id", element: <CharacterDetails /> },
                { path: "/create-product", element: <CreatingCard /> },
                {
                    path: "/profile",
                    element: (
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    ),
                },
                { path: "/favorites", element: <FavoritesList /> },
                { path: "/signup", element: <Signup /> },
                { path: "/login", element: <Login /> },
            ],
        },
        { path: "*", element: <NotFoundPage /> },
    ],
    {
        basename: import.meta.env.DEV ? "/" : "/StarWarApiRouting.io",
    }
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);

register();

//
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// import App from './App.jsx'
// import Home from './pages/Home.jsx'
// import CreatingCard from './pages/CreatingCard.jsx'
// import CharacterDetails from './pages/CharacterDetails.jsx'
// import NotFoundPage from './pages/NotFoundPage.jsx'
// import Profile from "./pages/Profile.jsx";
// import Signup from "./pages/Signup.jsx";
// import Login from "./pages/Login.jsx";
// import {Provider} from "react-redux";
// import {store} from "./store.js";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import FavoritesList from "./pages/FavoritesList.jsx";
// import CharactersList from "./pages/CharactersList.jsx";
//
// export default App;
//
// const router = createBrowserRouter(
//     [
//         {
//             path: '/',
//             element: <App />,
//             children: [
//                 { path: '/', element: <Home /> },
//                 { path: '/characters', element: (
//                         // <ProtectedRoute>
//                         <CharactersList />
//                         // </ProtectedRoute>
//                     )
//                 },
//                 { path: '/character/:id', element: (
//                         // <ProtectedRoute>
//                         <CharacterDetails />
//                         // </ProtectedRoute>
//                     )
//                 },
//                 { path: '/create-product', element: <CreatingCard /> },
//                 { path: '/profile', element: (
//                         <ProtectedRoute>
//                             <Profile />
//                         </ProtectedRoute>
//                     )
//                 },
//                 { path: '/favorites', element: (
//                         // <ProtectedRoute>
//                         <FavoritesList />
//                         // </ProtectedRoute>
//                     )
//                 },
//
//                 { path: '/signup', element: <Signup /> },
//                 { path: '/login', element: <Login /> },
//             ],
//         },
//         { path: '*', element: <NotFoundPage /> },
//     ],
//     {
//         // basename: "/StarWarApiRouting.io",
//         basename: import.meta.env.DEV ? "/" : "/StarWarApiRouting.io",
//     }
// );
// createRoot(document.getElementById('root')).render(
//     <StrictMode>
//         <Provider store={store}>
//             <RouterProvider router={router} />
//         </Provider>
//     </StrictMode>,
// )
