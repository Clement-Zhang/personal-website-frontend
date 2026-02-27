import Home from './views/pages/Home.page';
import Nothing from './views/pages/Nothing.page';
import Projects from './views/pages/Projects.page';
import Dating from './views/pages/Dating.page';
import './assets/css/App.css';
import DataProvider from './globals/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <DataProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/dating" element={<Dating />} />
                    <Route path="*" element={<Nothing />} />
                </Routes>
            </BrowserRouter>
        </DataProvider>
    );
}
