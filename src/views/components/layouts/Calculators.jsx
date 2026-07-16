import Sidebar from '../statics/Sidebar';
import { Outlet } from 'react-router';

export default function Calculators() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 relative">
                <Outlet />
            </div>
        </div>
    );
}
