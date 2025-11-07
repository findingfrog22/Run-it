import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

export function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-custom-navbar">
            <Container>
                {/* This endpoint will scroll back to the top of the page if they are on the home page, but redirect to the main page if they are on another page. */}
                <Navbar.Brand href="#">
                    <img
                        alt="Logo for the website Run-It, looks like..."
                        src="../../public/temporary_logo_transparent.svg"
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* Similar to the logo, but for the various page. */}
                        <Nav.Link className="text-light nav-link-text" href="#1">Benchmarking</Nav.Link>
                        <Nav.Link className="text-light nav-link-text" href="#2">Information</Nav.Link>
                        <Nav.Link className="text-light nav-link-text" href="#3">About Us</Nav.Link>
                    </Nav>

                    <Nav>
                        {/* This link differs, will always redirect to the signup page. */}
                        <Nav.Link href="#4"><Button variant="primary" className="nav-link-text">Sign up</Button></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}