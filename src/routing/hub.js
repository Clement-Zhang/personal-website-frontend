import {
        createBrowserRouter,
        RouterProvider,
        createRoutesFromElements,
        Route,
    } from "react-router-dom";
import Home from "../pages/home";
import Nothing from "../pages/nothing";
import Projects from "../pages/projects";

const Router = () => (
    <RouterProvider router={
        createBrowserRouter(
            createRoutesFromElements(
                [
                    <Route path="/" element={<Home />}/>,
                    <Route path="/projects" element={<Projects />}/>
                ]
            )
        )
    }/>
);
  
export default Router;