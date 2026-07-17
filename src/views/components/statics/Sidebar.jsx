import tabs from '@/configs/tabs/calculators.config';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <>
            <div className="md:hidden">
                <nav className="flex flex-col top-0 bg-gray-700 md:w-64 min-h-screen">
                    {tabs.map((tab) => (
                        <Link to={tab.path} key={tab.path}>
                            <img src={tab.icon}></img>
                        </Link>
                    ))}
                </nav>
            </div>
            <nav className="hidden md:flex flex-col top-0 bg-gray-700 w-64 min-h-screen">
                {tabs.map((tab) => (
                    <Link to={tab.path} key={tab.path}>
                        <img src={tab.icon}></img>
                    </Link>
                ))}
            </nav>
        </>
    );
}
