import tabs from '../../../data/calculatorTabs';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <nav className="flex flex-col sticky top-0 bg-gray-700 h-screen max-w-64">
            {tabs.map((tab) => (
                <Link to={tab.link} key={tab.path}>
                    <img src={tab.icon}></img>
                </Link>
            ))}
        </nav>
    );
}
