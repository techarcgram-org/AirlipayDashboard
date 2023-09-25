import {Container,Nav,Navbar} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import {BsSearch,BsBell} from 'react-icons/bs'
import {AiOutlineMail} from 'react-icons/ai'
import {FiSettings} from 'react-icons/fi'

function Header() {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 455 299"
            fill="#4760FF"
          >
            <path
              d="M227.119 0L0 127.81H56.7799V298.223H170.34V213.017H283.899V298.223H397.459V126.532L454.239 127.81L227.119 0Z"
              fill="#4760FF"
            />
          </svg>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link as={Link} to="/search">
              <BsSearch />
            </Nav.Link>
            <Nav.Link as={Link} to="/chat">
              <AiOutlineMail />
            </Nav.Link>
            <Nav.Link as={Link} to="/notification">
              <BsBell />
            </Nav.Link>
            <Nav.Link as={Link} to="/setting">
              <FiSettings />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
