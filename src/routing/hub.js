import {
        createBrowserRouter,
        RouterProvider,
        createRoutesFromElements,
        Route,
    } from "react-router-dom";
import Home from "../pages/home";
import Nothing from "../pages/nothing";

const Router = () => (
    <RouterProvider router={
        createBrowserRouter(
            createRoutesFromElements(
                [
                    <Route path="/" element={<Home />}/>,
                    <Route path="/projects" element={<Nothing />}/>
                ]
            )
        )
    }/>
);
  
export default Router;