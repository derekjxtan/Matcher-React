import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import About from './components/about';

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
    document.body.style.backgroundColor = 'black';
  };

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Navigate to='/home' replace />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
