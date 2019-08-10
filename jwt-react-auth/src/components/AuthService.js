import decode from 'jwt-decode';

export default class AuthService {
	
	// Constructor
	// @implemented
	constructor(domain) {
		this.domain = domain || '' // API SERVER DOMAIN
		this.fetch = this.fetch.bind(this);
		this.login = this.fetch.bind(this)
		this.getProfile = this.getProfile.bind(this);
	}

	// Login
	// @implemented
	login(username, password) {
		return this.fetch(`${this.domain}/login`, {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		}).then(res => {
			this.setToken(res.token) // Setting token in localStorage
			return Promise.resolve(res); 
		})
	}

	// IsTokenExpired
	// @implemented
	isTokenExpired(token) {
		try {
			const decoded = decode(token);
			if (decode.exp < Date.now() / 1000) { // Check if token is expired N.
				return true;
			}
			else {
				return false;
			}
		}
		catch(err) {
			return false;
		}
	}

	// loggedIn
	// @implemented
	loggedIn() {
		const token = this.getToken()
		return !!token && !this.isTokenExpired(token)
	}

	// Set Token
	// @implemented
	setToken(idToken) {
		// Retrieves the user token from localStorage
		localStorage.setItem('id_token', idToken);
	}

	// Get Token
	// @implemented
	getToken() {
		localStorage.getItem('id_token');
	}

	// Logout
	// @implemented
	logout() {
		localStorage.removeItem('id_token');
	}

	// GetProfile
	// @implemented
	getProfile() {
		return decode(this.getToken());
	}

	// Fetch
	// @implemented
	fetch(url, options) {
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}

		// Setting Authorization header
		// Auhtorization: Bearer xxxxx.xxxxxx.xxxx
		if (this.loggedIn()) {
			headers['Authorization'] = `Bearer ${this.getToken}`;
		}

		return fetch(url, {
			headers,
			...options
		})
			.then(this._checkStatus)
			.then(response => response.json())
	}

	// checkStatus
	// @implemented
	_checkStatus(response) {
		// raise an error in case response status is not a success
		if (response.status >= 200 && response.status < 300) {
			return response
		}
		else {
			var error = new Error(response.statusText)
			error.response = response
			throw error
		}
	}
}