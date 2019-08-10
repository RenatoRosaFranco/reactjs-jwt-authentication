import React, { Component } from 'react';
import AuthService from './AuthService';
import './Login.css';

class Login extends Component {
	
	constructor(props) {
	  super(props);

	  this.Auth = new AuthService();
	  this.handleFormSubmit = this.handleFormSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount() {
		if(this.Auth.loggedIn())
				this.props.history.replace('/');
	}

	handleFormSubmit(e) {
		e.preventDefault();

		this.Auth.login(this.state.username, this.state.password)
			.then(res =>{
				this.props.history.replace('/');
			})
			.catch(err => {
				alert(err);
			})
	}

	render() {
		return(
			<div className="name">
				<div className="card">
					<h1>Login</h1>

					<form>
						<input
							className="form-item"
							placeholder="Username goes here..."
							name="username"
							type="text"
							onChange={this.handleChange} />

						<input
							className="form-item"
							placeholder="Password goes here"
							name="password"
							type="password"
							onChange={this.handleChange} />

						<input
							className="form-item"
							value="SUBMIT"
							type="submit" />
					</form>
				</div>
			</div>
		)
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
		console.log('username:', e.target.name)
		console.log('password:', e.target.value)
	}
}

export default Login;