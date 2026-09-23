

import App from './App.tsx'
import { Outlet } from 'react-router-dom'
import Login from './pages/Login.tsx';
import Profile from './pages/Profile.tsx';

const Layout = () => (
    <>
        {/* <Header /> */}
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
                element: <Login />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            // {
            //     path: "/user-lsit",
            //     element: <UserList />,
            // },
            // {
            //     path: "/user/:id",
            //     element: <User />,
            // },

            // {
            //     path: "*",
            //     element: <PageNotFound />,
            // },
        ]
    }
]
export default routes;