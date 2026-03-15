import { Link } from 'react-router-dom';

export default function Navbar() {
    const tabs = [
        { label: 'Clement Zhang', path: '/', style: '!text-4xl' },
        { label: 'My Projects', path: '/projects' },
        { label: 'Dating App POC', path: '/dating' },
    ];
    return (
        <nav className="flex sticky top-0 items-center justify-center gap-4 *:text-xl m-2 bg-dark h-12">
            {tabs.map((tab) => (
                <Link
                    to={tab.path}
                    key={tab.path}
                    className={'hover:bg-black h-full' + tab.style}
                >
                    {tab.label}
                </Link>
            ))}
        </nav>
    );
}
