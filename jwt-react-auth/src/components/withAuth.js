import React, { Component } from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService('http://localhost:8080');
  
  return class AuthWrapped extends Component {
  	constructor(props) {
  		super(props);
  		this.state = {
  			user: null
  		}
  	}

  	componentWillMount() {
  		if(!Auth.loggedIn()) {
  			this.props.history.replace('/login')
  		}
  		else {
  			try {
  				const profile = Auth.getProfile()
  				this.setState({
  					user: profile
  				});
  			}
  			catch(err) {
  				Auth.logout()
  				this.props.history.replate('/login')
  			}
  		}
  	}

  	render() {
  		if(this.state.user) {
  			return(
  				<AuthComponent history={this.props.history} user={this.state.user} />
  			)
  		}
  		else {
  			return null
  		}
  	}

  }
}