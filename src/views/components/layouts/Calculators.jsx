import Sidebar from '../statics/Sidebar';
import { Outlet } from 'react-router';

export default function Calculators() {
    return (
        <div className="font-comic">
            <Sidebar />
            <Outlet />
        </div>
    );
}
