import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import SubmitForm from './components/submitForm';
import FeedbackForm from './components/feedbackForm';
import About from './components/about';
import { loginUser, logoutUser, registerUser } from './reducers/ActionCreators';

// map the store state to props so that components can access them
function mapStateToProps(state) {
  return {
    auth: state.auth
  }
};

// map actions to props so that conponenent can call them 
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    registerUser: (creds) => dispatch(registerUser(creds))
  }
};

class App extends Component {
  componentDidMount() {
    // for functions to be called when app component is mounted
    document.body.style.backgroundColor = 'black';
  };

  render() {
    return (
      <div>
        <Header 
          auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser}
          registerUser={this.props.registerUser}
        />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route exact path='/submit' element={<SubmitForm />} />
          <Route path='/feedback' element={<FeedbackForm />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Navigate to='/home' replace />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
