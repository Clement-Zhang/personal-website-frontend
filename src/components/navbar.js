import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css";

const MyNavbar = () => {
    return (
        <Navbar className={[styles.nav, "justify-content-center"]}>
            <Navbar.Brand><Link to="/">About Me</Link></Navbar.Brand>
            <Link to="/projects">My Projects</Link>
            <Link to="/ama">Dating App POC</Link>
        </Navbar>
    );
}

export default MyNavbar