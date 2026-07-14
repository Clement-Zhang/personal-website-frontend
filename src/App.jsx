import Default from './views/components/layouts/Default';
import Home from './views/pages/Home.page';
import Nothing from './views/pages/Nothing.page';
import Projects from './views/pages/Projects.page';
import Dating from './views/pages/Dating.page';
import Calculators from './views/components/layouts/Calculators';
import CalculatorHome from './views/pages/calculators/Home.page';
import Hackers from './views/pages/calculators/Hackers.page';
import './assets/css/App.css';
import DataProvider from './globals/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <DataProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Default />}>
                        <Route index element={<Home />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="dating" element={<Dating />} />
                        <Route path="*" element={<Nothing />} />
                    </Route>
                    <Route path="/calculators/" element={<Calculators />}>
                        <Route index element={<CalculatorHome />} />
                        <Route path="hackers" element={<Hackers />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </DataProvider>
    );
}
