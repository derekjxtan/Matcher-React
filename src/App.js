import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import NewMatch from './components/newMatch';
import Matches from './components/matches';
import SubmitForm from './components/submitForm';
import FeedbackForm from './components/feedbackForm';
import About from './components/about';
import { 
  loginUser, 
  logoutUser, 
  registerUser, 
  postNewMatch, 
  fetchSingleMatch,
  deleteSingleMatch,
} from './reducers/ActionCreators';

// map the store state to props so that components can access them
function mapStateToProps(state) {
  return {
    Auth: state.Auth,
    AllMatches: state.AllMatches,
    SingleMatch: state.SingleMatch,
  }
};

// map actions to props so that conponenent can call them 
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    registerUser: (creds) => dispatch(registerUser(creds)),
    postNewMatch: (match) => dispatch(postNewMatch(match)),
    fetchSingleMatch: (matchid) => dispatch(fetchSingleMatch(matchid)),
    deleteSingleMatch: (matchid) => dispatch(deleteSingleMatch(matchid)),
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
          Auth={this.props.Auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser}
          registerUser={this.props.registerUser}
        />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/newmatch' element={<NewMatch postNewMatch={this.props.postNewMatch}/>} />
          <Route path='/matches' element={<Matches AllMatches={this.props.AllMatches} deleteSingleMatch={this.props.deleteSingleMatch}/>} />
          <Route exact path='/submit' element={<SubmitForm fetchSingleMatch={this.props.fetchSingleMatch}/>} />
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
