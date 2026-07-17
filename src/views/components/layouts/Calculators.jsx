import Sidebar from '../statics/Sidebar';
import { Outlet } from 'react-router';

export default function Calculators() {
    return (
        <div className="flex">
            <div className="shrink-0">
                <Sidebar />
            </div>
            <div className="flex-1 relative">
                <Outlet />
            </div>
        </div>
    );
}
