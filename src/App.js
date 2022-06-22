import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Header from './components/header';

// map the store state to props so that components can access them
function mapStateToProps(state) {
  return {}
};

// map actions to props so that conponenent can call them 
const mapDispatchToProps = (dispatch) => {
  return {}
};

class App extends Component {
  componentDidMount() {
    // for functions to be called when app component is mounted
  };

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
