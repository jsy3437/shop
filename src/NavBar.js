import react from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';

function NavBar() {
	return (
		<div>
			<Navbar bg='light' expand='lg'>
				<Container>
					<Navbar.Brand href='#home'>ShoeShop</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link as={Link} to='/'>
								Home
							</Nav.Link>
							<Nav.Link as={Link} to='/detail'>
								detail
							</Nav.Link>
							<NavDropdown title='Dropdown' id='basic-nav-dropdown'>
								<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
								<NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
								<NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}
export default NavBar;
