import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import NewMatch from './components/newMatch';
import Matches from './components/matches';
import EditMatchPage from './components/editMatch';
import ResponsesPage from './components/matchResponse';
import MatchSearchForm from './components/matchSearchForm';
import MatchInputSubmitForm from './components/matchInputSubmitForm';
import FeedbackForm from './components/feedbackForm';
import About from './components/about';
import { 
  loginUser, 
  logoutUser, 
  registerUser, 
  fetchAllMatches,
  postNewMatch, 
  fetchSingleMatch,
  deleteSingleMatch,
  putSingleMatch,
  deleteAllResponses,
  deleteSingleResponse,
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
    fetchAllMatches: () => dispatch(fetchAllMatches()),
    postNewMatch: (match) => dispatch(postNewMatch(match)),
    fetchSingleMatch: (matchid) => dispatch(fetchSingleMatch(matchid)),
    deleteSingleMatch: (matchid) => dispatch(deleteSingleMatch(matchid)),
    putSingleMatch: (matchid, editedMatch) => dispatch(putSingleMatch(matchid, editedMatch)),
    deleteAllResponses: (matchid) => dispatch(deleteAllResponses(matchid)),
    deleteSingleResponse: (matchid, responseid) => dispatch(deleteSingleResponse(matchid, responseid)),
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
          <Route exact path='/matches' element={<Matches AllMatches={this.props.AllMatches} fetchAllMatches={this.props.fetchAllMatches} deleteSingleMatch={this.props.deleteSingleMatch}/>} />
          <Route path='/matches/:matchId/edit' element={<EditMatchPage AllMatches={this.props.AllMatches} putSingleMatch={this.props.putSingleMatch}/>} />
          <Route path='/matches/:matchId/responses' element={<ResponsesPage AllMatches={this.props.AllMatches} fetchAllMatches={this.props.fetchAllMatches} deleteAllResponses={this.props.deleteAllResponses} deleteSingleResponse={this.props.deleteSingleResponse}/>} />
          <Route exact path='/search' element={<MatchSearchForm SingleMatch={this.props.SingleMatch} fetchSingleMatch={this.props.fetchSingleMatch}/>} />
          <Route exact path='/search/input' element={<MatchInputSubmitForm SingleMatch={this.props.SingleMatch}/>} />
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
