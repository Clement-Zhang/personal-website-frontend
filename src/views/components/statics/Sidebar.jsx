import tabs from '../../../configs/calculatorTabs';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <nav className="flex flex-col top-0 bg-gray-700 min-h-screen max-w-64 self-stretch!">
            {tabs.map((tab) => (
                <Link to={tab.path} key={tab.path}>
                    <img src={tab.icon}></img>
                </Link>
            ))}
        </nav>
    );
}
