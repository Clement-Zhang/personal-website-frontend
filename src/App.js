import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/pages/Home';
import Nothing from './views/pages/Nothing';
import Projects from './views/pages/Projects';
import Ama from './views/pages/Ama';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/ama" element={<Ama />} />
            </Routes>
        </BrowserRouter>
    );
}
