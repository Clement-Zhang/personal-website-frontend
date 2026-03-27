import { Link } from 'react-router-dom';

export default function Navbar() {
    const tabs = [
        { label: 'Clement Zhang', path: '/', style: '!text-3xl' },
        { label: 'My Projects', path: '/projects' },
        { label: 'Dating App POC', path: '/dating' },
    ];
    return (
        <nav className="flex sticky top-0 justify-center gap-4 *:text-xl bg-zinc-700 h-12">
            {tabs.map((tab) => (
                <Link
                    to={tab.path}
                    key={tab.path}
                    className={
                        'flex items-center hover:bg-black h-full ' + tab.style
                    }
                >
                    {tab.label}
                </Link>
            ))}
        </nav>
    );
}
