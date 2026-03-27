import { Link } from 'react-router-dom';

export default function Navbar() {
    const tabs = [
        { label: 'Clement Zhang', path: '/', style: '!text-3xl' },
        { label: 'My Projects', path: '/projects' },
        { label: 'Dating App POC', path: '/dating' },
    ];
    return (
        <nav className="flex sticky top-0 justify-center *:text-xl bg-black h-20 sm:h-12">
            {tabs.map((tab) => (
                <Link
                    to={tab.path}
                    key={tab.path}
                    className={
                        'flex items-center hover:bg-zinc-700 h-full px-4 ' +
                        tab.style
                    }
                >
                    {tab.label}
                </Link>
            ))}
        </nav>
    );
}
