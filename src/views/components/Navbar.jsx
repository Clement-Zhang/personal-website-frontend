import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/navbar.module.css';

export default function MyNavbar() {
    return (
        <Navbar className={[styles.nav, 'justify-content-center']}>
            <Navbar.Brand>
                <Link to="/">About Me</Link>
            </Navbar.Brand>
            <Link to="/projects">My Projects</Link>
            <Link to="/ama">Dating App POC</Link>
        </Navbar>
    );
}
