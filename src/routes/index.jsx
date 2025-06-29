import { createBrowserRouter, RouterProvider } from "react-router" 
import Home from "../views/Home"
import Detail from "../views/Detail"
import Error404 from "../views/Error404"
import Profile from "../views/Profile"

const   router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        errorElement: <Error404/>
    },
    {
        path:'/detail/:eventId',
        element: <Detail/>
    },
    {
        path: '/profile',
        element: <Profile/>,
        children:[{
            path:'my-info', 
            element: <div>hla mundo</div>
        },{
            path: 'like-events',
            element:  <div>events</div>
        }]
    }
])

const MyRoutes=()=>{
    return(
        <RouterProvider router={router}/>
    )
}

export default MyRoutes