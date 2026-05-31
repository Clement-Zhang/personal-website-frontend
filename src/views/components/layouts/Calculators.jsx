import Sidebar from '../statics/Sidebar';
import { useOptions, OptionsProvider } from '../customs/Options';
import { Outlet } from 'react-router';

export default function Calculators() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <OptionsProvider>
                    <Outlet />
                </OptionsProvider>
            </div>
        </div>
    );
}
