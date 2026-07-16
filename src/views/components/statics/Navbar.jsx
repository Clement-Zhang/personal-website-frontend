import tabs from '../../../configs/websiteTabs.config.js';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="flex sticky top-0 justify-center *:text-xl bg-black h-21 sm:h-12">
            {tabs.map((tab) => (
                <Link
                    to={tab.path}
                    key={tab.path}
                    className={
                        'flex items-center hover:bg-zinc-700 h-full px-4 text-text-color! no-underline! focus:no-underline! ' +
                        tab.style
                    }
                >
                    {tab.label}
                </Link>
            ))}
        </nav>
    );
}
