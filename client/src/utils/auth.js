import { jwtDecode } from "jwt-decode";

class AuthService {
	getProfile() {
		return jwtDecode(this.getToken());
	}

	loggedIn() {
		const token = this.getToken();
		return token && !this.isTokenExpired(token) ? true : false;
	}

	isTokenExpired(token) {
		const decoded = jwtDecode(token);
		if (decoded.exp * 1000 < Date.now()) {
			localStorage.removeItem("id_token");
			return true;
		}
		return false;
	}

	getToken() {
		return localStorage.getItem("id_token");
	}

	login(idToken) {
		localStorage.setItem("id_token", idToken);
		window.location.assign("/");
	}

	logout() {
		localStorage.removeItem("id_token");
		window.location.reload();
	}

	signUp(idToken) {
		localStorage.setItem("id_token", idToken);
		window.location.assign("/profile");
	}
}

export default new AuthService();
