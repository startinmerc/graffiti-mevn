import Vue from "vue";
import mapboxgl from "mapbox-gl";
import axios from "axios";
// Import popup component & create class for mounting
import ArtworkPopup from "../components/ArtworkPopup";
const ArtworkPopupClass = Vue.extend(ArtworkPopup);

// Generated URL using container's dimentions for image size
// this.$refs.mapContainer.clientWidth
// this.$refs.mapContainer.clientHeight
export function getStaticUrl(width, height) {
	return `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-1.0803,53.9583,12,0/${Math.min(
		width,
		1280
	)}x${height}?access_token=${process.env.VUE_APP_MAPBOX_TOKEN}`;
}

export function loadMap() {
	// Async loading function to await styles
	return new Promise((resolve) => {
		// Max Boundaries of map
		var bounds = [
			[-1.167997, 53.91244], // Southwest coordinates
			[-1.005763, 54.00422], // Northeast coordinates
		];
		// Create Map
		let mapBox = new mapboxgl.Map({
			// Target div id
			container: "map-container",
			// Custom mapbox style
			style: process.env.VUE_APP_MAPBOX_STYLE,
			// Geolocation of map center
			center: [-1.080278, 53.958332],
			// Default zoom level
			zoom: 13,
			// Add maxBounds
			maxBounds: bounds,
		});

		// Add control for geolocation of user
		mapBox.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true,
				},
				trackUserLocation: true,
			})
		);
		// Resolve Promise when styling is loaded
		mapBox.on("styledata", () => {
			// Send mapBox to pass through to other methods
			resolve(mapBox);
		});

		// When map is fully loaded
		mapBox.on("load", () => {
			// Find if paramater has been passed
			const paramID = this.$route.params.id;
			// If it has,
			if (paramID !== undefined) {
				// Set timeout (avoids async errors, probably a better way)
				// !-See https://github.com/mapbox/mapbox-gl-js/issues/4222#issuecomment-279446075
				setTimeout(function() {
					// Get artworks layer from map
					let features = mapBox.queryRenderedFeatures({
						layers: ["artworks"],
					});
					// Filter markers by param to find matching one
					let marker = features.filter((i) => i.properties.id === paramID)[0];
					// !-Fly to location (To be refactored)
					mapBox.flyTo({
						center: marker.geometry.coordinates,
						speed: 0.8,
						zoom: 17,
					});
					// !-Arbitrary timeout
				}, 500);
			}
		});
	});
}

export function addPoints(mapBox) {
	return new Promise((resolve) => {
		axios.get("http://localhost:8081/api/geojson/").then((response) => {
			mapBox.addSource("artworks", response.data);
			resolve();
		});
	});
}

export function addLayer(mapBox) {
	mapBox.addLayer({
		id: "artworks",
		type: "symbol",
		source: "artworks",
		layout: {
			// SVG file loaded into Mapbox Studio style
			"icon-image": "ArtworkMarker",
			// Allow icons to be visible over other icons
			"icon-allow-overlap": true,
			// Why, Mapbox, did it take me an hour to find this property in your docs?
			"icon-anchor": "bottom",
		},
	});
}
export function addMouseInteraction(mapBox) {
	mapBox.on("click", "artworks", (e) => {
		// Coordinates from event
		let coordinates = e.features[0].geometry.coordinates.slice();
		// Data from event trigger
		let title = e.features[0].properties.title;
		let artist = e.features[0].properties.artist;
		let description = e.features[0].properties.description;
		let id = e.features[0].properties.id;
		let photos = e.features[0].properties.photos;

		const popup = new mapboxgl.Popup({
			// Offset bottom of popup to flow from marker pointer
			offset: { bottom: [0, -20] },
			// Remove max width to make it auto
			maxWidth: "none",
			// Remove close button
			closeButton: false,
		})
			.setLngLat(coordinates)
			// Set HTML as Vue ref div
			.setHTML('<div id="vue-popup-content"></div>')
			.addTo(mapBox);

		// Create new Vue component with props for Popup
		const popupInstance = new ArtworkPopupClass({
			propsData: {
				title: title,
				artist: artist,
				id: id,
				photos: photos,
				description: description,
			},
		});

		// Center map on selcted point
		mapBox.flyTo({
			center: e.features[0].geometry.coordinates,
			speed: 0.8,
		});

		// Mount Vue component within the Vue ref div created earlier
		popupInstance.$mount("#vue-popup-content");

		// Update popup after adding content to resize
		popup._update();
	});

	// Change the cursor to a pointer when the mouse is over the artworks layer.
	mapBox.on("mouseenter", "artworks", function() {
		mapBox.getCanvas().style.cursor = "pointer";
	});

	// Change it back to a pointer when it leaves.
	mapBox.on("mouseleave", "artworks", function() {
		mapBox.getCanvas().style.cursor = "";
	});
}
