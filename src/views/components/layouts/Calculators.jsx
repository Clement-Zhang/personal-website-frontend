import Sidebar from '../statics/Sidebar';
import { useOptions, OptionsProvider } from '../customs/Options';
import { Outlet } from 'react-router';

export default function Calculators() {
    return (
        <div className="flex">
            <Sidebar />
            <div className={'flex-1'}>
                <OptionsProvider>
                    <div className="p-4">
                        <Outlet />
                    </div>
                </OptionsProvider>
            </div>
        </div>
    );
}
