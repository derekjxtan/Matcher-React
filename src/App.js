import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import NewMatchPage from './components/newMatch';
import Matches from './components/matches';
import EditMatchPage from './components/editMatch';
import ResponsesPage from './components/matchResponse';
import ResultsPage from './components/matchResult';
import MatchSearchForm from './components/matchSearchForm';
import MatchInputSubmitPage from './components/matchInputSubmitForm';
import FeedbackForm from './components/feedbackForm';
import About from './components/about';
import { 
  loginUser, 
  logoutUser, 
  registerUser,
  checkLogin, 
  fetchAllMatches,
  postNewMatch, 
  fetchSingleMatch,
  deleteSingleMatch,
  putSingleMatch,
  postSingleResponse,
  deleteAllResponses,
  deleteSingleResponse,
  fetchResults,
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
    checkLogin: () => dispatch(checkLogin()),
    fetchAllMatches: () => dispatch(fetchAllMatches()),
    postNewMatch: (match) => dispatch(postNewMatch(match)),
    fetchSingleMatch: (matchid) => dispatch(fetchSingleMatch(matchid)),
    deleteSingleMatch: (matchid) => dispatch(deleteSingleMatch(matchid)),
    putSingleMatch: (matchid, editedMatch) => dispatch(putSingleMatch(matchid, editedMatch)),
    postSingleResponse: (matchid, response) => dispatch(postSingleResponse(matchid, response)),
    deleteAllResponses: (matchid) => dispatch(deleteAllResponses(matchid)),
    deleteSingleResponse: (matchid, responseid) => dispatch(deleteSingleResponse(matchid, responseid)),
    fetchResults: (matchid) => dispatch(fetchResults(matchid)),
  }
};

class App extends Component {
  componentDidMount() {
    // for functions to be called when app component is mounted
    document.body.style.backgroundColor = 'black';
    this.props.checkLogin();
  };

  render() {
    const PrivateRouteWrapper = () => {
      return this.props.Auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    };

    const PrivateRoute = ({ children }) => {
      return this.props.Auth.isAuthenticated ? children : <Navigate to="/login" />;
    };

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
          <Route path='/newmatch' element={<PrivateRoute><NewMatchPage postNewMatch={this.props.postNewMatch}/></PrivateRoute>} />
          <Route exact path='/matches' element={<Matches AllMatches={this.props.AllMatches} fetchAllMatches={this.props.fetchAllMatches} deleteSingleMatch={this.props.deleteSingleMatch}/>} />
          <Route path='/matches/:matchId/edit' element={<PrivateRoute><EditMatchPage AllMatches={this.props.AllMatches} putSingleMatch={this.props.putSingleMatch}/></PrivateRoute>} />
          <Route path='/matches/:matchId/responses' element={<PrivateRoute><ResponsesPage AllMatches={this.props.AllMatches} fetchAllMatches={this.props.fetchAllMatches} deleteAllResponses={this.props.deleteAllResponses} deleteSingleResponse={this.props.deleteSingleResponse}/></PrivateRoute>} />
          <Route path='/matches/:matchId/results' element={<PrivateRoute><ResultsPage AllMatches={this.props.AllMatches} fetchAllMatches={this.props.fetchAllMatches} fetchResults={this.props.fetchResults}/></PrivateRoute>} />
          <Route exact path='/search' element={<MatchSearchForm SingleMatch={this.props.SingleMatch} fetchSingleMatch={this.props.fetchSingleMatch}/>} />
          <Route exact path='/search/input' element={<MatchInputSubmitPage SingleMatch={this.props.SingleMatch} postSingleResponse={this.props.postSingleResponse}/>} />
          <Route path='/feedback' element={<FeedbackForm />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Navigate to='/home' replace />} />
        </Routes>
        <Footer Auth={this.props.Auth}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
