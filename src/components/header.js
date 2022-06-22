import React, { Component } from 'react';
import { Navbar, NavbarBrand, Button, NavItem, Nav, NavbarToggler, Collapse, NavLink } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
    };

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand='md'>
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className='ms-auto' href="/">
                            <span className='ms-0 mb-0 h2'>
                                Matcher
                            </span>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className='nav-link' to='/home'>
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/newmatch'>
                                        Create New Match
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/matches'>
                                        Matches
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/Feedback'>
                                        Feedback
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/about'>
                                        About
                                    </NavLink>
                                </NavItem>
                            </Nav> 
                            <Nav className='ms-auto' navbar>
                                <NavItem>
                                    <Button>Login</Button>
                                </NavItem>
                            </Nav>   
                        </Collapse>
                </Navbar>
            </React.Fragment>
        );
    };
}

export default Header;