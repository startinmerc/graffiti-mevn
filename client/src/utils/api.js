import axios from "axios";

export function getGeoJSON() {
	return new Promise((resolve) => {
		axios.get("http://localhost:8081/api/geojson/").then((response) => {
			resolve(response.data);
		});
	});
}

export function getAllArtists() {
	return new Promise((resolve) => {
		axios.get("http://localhost:8081/api/artists/").then((response) => {
			resolve(response.data);
		});
	});
}

export function getArtist(id) {
	return new Promise((resolve) => {
		axios.get(`http://localhost:8081/api/artists/${id}`).then((response) => {
			resolve(response.data);
		});
	});
}

export function getArtwork(query) {
	return new Promise((resolve) => {
		axios
			.get(`http://localhost:8081/api/artworks/${query}`)
			.then((response) => {
				resolve(response.data);
			});
	});
}
