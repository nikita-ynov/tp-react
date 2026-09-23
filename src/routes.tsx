

import App from './App.tsx'
import { Outlet } from 'react-router-dom'
import Login from './pages/Login.tsx';
import Profile from './pages/Profile.tsx';
import Header from './components/Header.tsx';
import GuestRoute from './routes/GuestRoute.tsx';
import PrivateRoute from './routes/PrivateRoute.tsx';
import PageNotFound from './pages/PageNotFound.tsx';
import Users from './pages/Users.tsx';

const Layout = () => (
    <>
        <Header />
        <Outlet />
    </>
)

const routes = [
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "/login",
                element: <GuestRoute><Login /></GuestRoute>,
            },
            {
                path: "/profile",
                element: <PrivateRoute><Profile /></PrivateRoute>,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "*",
                element: <PageNotFound />,
            },
        ]
    }
]
export default routes;