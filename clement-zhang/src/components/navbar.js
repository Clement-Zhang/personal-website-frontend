import { Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css";

const MyNavbar = () => {
    return (
        <Navbar className={styles.nav}>
            <Navbar.Brand><Link to="/">About Me</Link></Navbar.Brand>
            <Link to="/projects">My Projects</Link>
        </Navbar>
    );
}

export default MyNavbar;