import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="sticky top-0 flex items-center justify-center gap-4 *:text-xl">
            <Link to="/" className="!text-3xl">
                About Me
            </Link>
            <Link to="/projects">My Projects</Link>
            <Link to="/ama">Dating App POC</Link>
        </nav>
    );
}
