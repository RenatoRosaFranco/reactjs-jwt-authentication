import React from 'react';
import logo from './logo.svg';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
import './App.css';

const Auth = new AuthService();

class App extends React.Component {

  handleLogout() {
    Auth.logout()
    this.props.history.replace('/login');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome {this.props.user.username}</h2>
        </header>
        <p className="App-intro">
          <button type="button" className="form-submit" 
          onClick={this.handleLogout.bind(this)}>Logout</button>
        </p>
      </div>
    );
  }
}

export default withAuth(App);
