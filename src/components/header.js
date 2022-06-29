import React, { Component } from 'react';
import { Navbar, NavbarBrand, Button, NavItem, Nav, NavbarToggler, Collapse, NavLink, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isLoginOpen: false,
            isRegisterOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleRegister = this.toggleRegister.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.logout = this.logout.bind(this);
    };

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleLogin() {
        this.setState({
            isLoginOpen: !this.state.isLoginOpen
        });
    }

    toggleRegister() {
        this.setState({
            isRegisterOpen: !this.state.isRegisterOpen
        });
    }

    login = (event) => {
        this.toggleLogin();
        const resp = JSON.stringify({username: this.username.value, password: this.password.value});
        alert('Login: ' + resp);
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();
    }

    register = (event) => {
        this.toggleRegister();
        const resp = JSON.stringify({username: this.username.value, password: this.password.value});
        alert('Register: ' + resp);
        this.props.registerUser(resp);
        event.preventDefault();
    }

    logout = (event) => {
        this.props.logoutUser();
        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand='md'>
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className='ms-auto' href="/">
                        <span className='h2'>
                            Matcher
                        </span>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className='nav-link' href='/home'>
                                    Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' href='/newmatch'>
                                    Create New Match
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' href='/matches'>
                                    Matches
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' href='/submit'>
                                    Submit
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' href='/Feedback'>
                                    Feedback
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' href='/about'>
                                    About
                                </NavLink>
                            </NavItem>
                        </Nav> 
                        <Nav className='ms-auto pb-2' navbar>
                            <NavItem>
                                {
                                    !this.props.Auth.isAuthenticated ? 
                                    <div>
                                        <Button className='me-3' onClick={this.toggleRegister}>Register</Button>
                                        <Button onClick={this.toggleLogin}>Login</Button>
                                    </div>
                                    :
                                    <div className='d-flex justify-content-start'>
                                        <div className='navbar-text me-3'>Welcome, {this.props.Auth.username}</div>
                                        <Button onClick={this.logout}>Logout</Button>
                                    </div>
                                }
                            </NavItem>
                        </Nav>   
                    </Collapse>
                </Navbar>
                <Modal isOpen={this.state.isLoginOpen} toggle={this.toggleLogin}>
                    <ModalHeader toggle={this.toggleLogin}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.login}>
                            <FormGroup>
                                <Label for="username">Username:</Label>
                                <Input type='text' name='username' id='username' placeholder='Username' innerRef={(input) => this.username = input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password:</Label>
                                <Input type='password' name='password' id='password' placeholder='Password' innerRef={(input) => this.password = input}/>
                            </FormGroup>
                            <FormGroup className='float-end'>
                                <Button color='secondary me-1' onClick={this.toggleLogin}>Cancel</Button>
                                <Button color='primary' type='submit'>Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isRegisterOpen} toggle={this.toggleRegister}>
                    <ModalHeader toggle={this.toggleRegister}>Register</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.register}>
                            <FormGroup>
                                <Label for="username">Username:</Label>
                                <Input type='text' name='username' id='username' placeholder='Username' innerRef={(input) => this.username = input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password:</Label>
                                <Input type='password' name='password' id='password' placeholder='Password' innerRef={(input) => this.password = input}/>
                            </FormGroup>
                            <FormGroup className='float-end'>
                                <Button color='secondary me-1' onClick={this.toggleRegister}>Cancel</Button>
                                <Button color='primary' type='submit'>Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    };
}

export default Header;