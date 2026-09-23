

import App from './App.tsx'
import { Outlet } from 'react-router-dom'

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