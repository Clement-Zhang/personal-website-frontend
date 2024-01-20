import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const MyNavbar = () => {
    return (
        <Navbar >
            <Navbar.Brand><Link to="">About Me</Link></Navbar.Brand>
        </Navbar>
    );
}

export default MyNavbar;