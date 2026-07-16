import Navbar from '../statics/Navbar';
import { Outlet } from 'react-router';

export default function Default() {
    return (
        <>
            <Navbar />
            <div className={'max-w-62.5 sm:max-w-lg lg:max-w-4xl mx-auto my-2'}>
                <Outlet />
            </div>
        </>
    );
}
