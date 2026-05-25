import { Link } from 'react-router-dom';

export default function Sidebar() {
    const tabs = [];
    return (
        <nav className="flex flex-col fixed justify-center bg-gray-800 h-screen w-24">
            {tabs.map((tab) => (
                <Link to={tab.path} key={tab.path}>
                    {tab.icon}
                </Link>
            ))}
        </nav>
    );
}
