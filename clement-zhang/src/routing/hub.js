import {
        createBrowserRouter,
        RouterProvider,
        createRoutesFromElements,
        Route,        
    } from "react-router-dom";
import Home from "../pages/home";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Home />}
        />
    )
);

const Routes = () => (
    <RouterProvider router={routes}/>
);
  
export default Routes;