import React, { Component, Fragment } from 'react';
import AppProvider, {
  Consumer
} from './AppProvider';
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import FlashMessage from './FlashMessage';
import Header from './Header';
import Home from './Home';
import CreateLink from './CreateLink';
import ViewLink from './ViewLink';
import PaidLink from './PaidLink';
import Search from './Search';
import { BrowserRouter as Router, NavLink, Link, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <Fragment>
            <Navbar />
            <FlashMessage />
            <Route exact path="/" component={() => <Home />} />
            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/signup" component={() => <Signup />} />
            <Route exact path="/dashboard" component={() => <Consumer>
              {
                ({ state }) => state.currentUser ?
                  <Dashboard /> :
                  <div className="header-wrapper">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
                  </div>
              }
            </Consumer>} />
            <Route exact path="/createlink" component={() => <Consumer>
              {
                ({ state }) => state.currentUser ?
                  <CreateLink /> :
                  <div className="content">
                    <h1>Access denied.</h1>
                    <p>You are not authorized to access this page.</p>
                  </div>
              }
            </Consumer>} />
            <Route exact path="/Search" component={() => <Consumer>
              {
                ({ state }) => state.currentUser ?
                  <Search /> :
                  <div className="content">
                    <h1>Access denied.</h1>
                    <p>You are not authorized to access this page.</p>
                  </div>
              }
            </Consumer>} />
            <Route exact path="/viewlink" component={() => <Consumer>
              {
                ({ state }) => state.currentUser ?
                  <ViewLink /> :
                  <div className="header-wrapper">
                    {/* <h1>Access denied.</h1>
                    <p>You are not authorized to access this page.</p> */}
                    <img width="100px" height="100px" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
                  </div>
              }
            </Consumer>} />
            <Route exact path="/paidlink" component={() => <Consumer>
              {
                ({ state }) => state.currentUser ?
                  <PaidLink /> :
                  <div className="header-wrapper">
                    <img width="100px" height="100px" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
                  </div>
              }
            </Consumer>} />
            <Route exact path="/signedOut" component={() =>
              <h1 className="content">You're now signed out.</h1>} />
            <Route exact path="/accountCreated" component={() =>
              <h1 className="content">Account created. <Link to="/Login">
                Proceed to Dashboard</Link></h1>} />
          </Fragment>
        </Router>
      </AppProvider>
    );
  }
}

export default App;


