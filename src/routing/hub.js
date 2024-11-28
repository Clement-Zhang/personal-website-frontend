import {
        createBrowserRouter,
        RouterProvider,
        createRoutesFromElements,
        Route,
    } from "react-router-dom";
import Home from "../pages/home";
import Nothing from "../pages/nothing";
import Projects from "../pages/projects";
import Sim from "../pages/cellGrowthSim.tsx";

const Router = () => (
    <RouterProvider router={
        createBrowserRouter(
            createRoutesFromElements(
                [
                    <Route path="/" element={<Home />}/>,
                    <Route path="/projects" element={<Projects />}/>,
                    <Route path="/sim" element={<Sim />}/>
                ]
            )
        )
    }/>
);
  
export default Router;