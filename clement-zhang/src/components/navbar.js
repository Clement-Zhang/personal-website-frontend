import { Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = () => {
    return (
        <Navbar>
            <Navbar.Brand><Link to="/">About Me</Link></Navbar.Brand>
            <Link to="/projects">My Projects</Link>
        </Navbar>
    );
}

export default MyNavbar;