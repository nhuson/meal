export function authHeader() {
	let token = localStorage.getItem("jwtToken")

	if (token) {
		return {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token
		}
	} else {
		return {
			"Content-Type": "application/json"
		}
	}
}