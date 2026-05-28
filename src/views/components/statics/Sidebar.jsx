import tabs from '../../../data/calculatorTabs';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <nav className="flex flex-col fixed justify-center bg-gray-700 h-screen max-w-40">
            {tabs.map((tab) => (
                <Link to={tab.link} key={tab.path}>
                    <img src={tab.icon}></img>
                </Link>
            ))}
        </nav>
    );
}
