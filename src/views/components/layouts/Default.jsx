import Navbar from '../statics/Navbar';
import { Outlet } from 'react-router';

export default function Default() {
    return (
        <div className="font-comic">
            <Navbar />
            <div className={'max-w-lg lg:max-w-4xl mx-auto my-2'}>
                <Outlet />
            </div>
        </div>
    );
}
