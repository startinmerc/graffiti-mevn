import axios from "axios";

// Figure out if local server
const isLocalhost = Boolean(
	window.location.hostname === "localhost" ||
		// [::1] is the IPv6 localhost address.
		window.location.hostname === "[::1]" ||
		// 127.0.0.1/8 is considered localhost for IPv4.
		window.location.hostname.match(
			/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
		)
);

let url = isLocalhost
	? "http://localhost:8081/api"
	: "https://graffiti-explorer-backend.herokuapp.com/api";

export function getGeoJSON() {
	return apiCall("get","/geojson");
}

export function getAllArtists() {
	return apiCall("get", "/artists");
}

export function getArtist(id) {
	return apiCall("get", `/artists/${id}`);
}

export function getArtwork(query) {
	return apiCall("get", `/artworks/${query}`);
}

export function postArtwork(data) {
	return apiCall("post", "/artworks", data);
}

export function apiCall(method, path, data) {
	// Return promise with api call
	return new Promise((resolve, reject) => {
		// Expeced method, path, data is optional
		// Url from top fn
		return (
			axios[method](url + path, data)
				.then((res) => {
					// Return data if successful
					return resolve(res.data);
				})
				// Catch any errors
				.catch((err) => {
					return reject({
						// Status is alwaus here
						status: err.response.status,
						// Message location differs if server is offline
						message:
							typeof err.response.data.error === "undefined"
								? err.response.statusText
								: err.response.data.error.message,
					});
				})
		);
	});
}
