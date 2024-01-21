import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const MyNavbar = () => {
    return (
        <Navbar >
            <Navbar.Brand><Link to="/">About Me</Link></Navbar.Brand>
            <Nav.Link><Link to="/projects">Projects</Link></Nav.Link>
        </Navbar>
    );
}

export default MyNavbar;