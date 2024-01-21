import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const MyNavbar = () => {
    return (
        <Navbar >
            <Navbar.Brand href="/">About Me</Navbar.Brand>
            <Nav.Link href="/projects">Projects</Nav.Link>
        </Navbar>
    );
}

export default MyNavbar;