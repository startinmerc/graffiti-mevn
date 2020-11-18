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

let url = isLocalhost ? "http://localhost:8081":"https://graffiti-explorer-backend.herokuapp.com";

export function getGeoJSON() {
	return new Promise((resolve) => {
		axios.get(`${url}/api/geojson/`).then((response) => {
			resolve(response.data);
		});
	});
}

export function getAllArtists() {
	return new Promise((resolve) => {
		axios.get(`${url}/api/artists/`).then((response) => {
			resolve(response.data);
		});
	});
}

export function getArtist(id) {
	return new Promise((resolve) => {
		axios.get(`${url}/api/artists/${id}`).then((response) => {
			resolve(response.data);
		});
	});
}

export function getArtwork(query) {
	return new Promise((resolve) => {
		axios
			.get(`${url}/api/artworks/${query}`)
			.then((response) => {
				resolve(response.data);
			});
	});
}
