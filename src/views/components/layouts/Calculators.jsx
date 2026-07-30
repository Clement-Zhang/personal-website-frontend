import Sidebar from '../statics/Sidebar';
import { Outlet } from 'react-router';
import { MotionConfig } from 'framer-motion';

export default function Calculators() {
    return (
        <div className="flex">
            <MotionConfig transition={{ duration: 0.3 }}>
                <div className="shrink-0">
                    <Sidebar />
                </div>
                <div className="flex-1 relative overflow-x-clip">
                    <Outlet />
                </div>
            </MotionConfig>
        </div>
    );
}
