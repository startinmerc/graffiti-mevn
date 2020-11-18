<template>
	<main id="full-map">
		<div id="map-container" ref="mapContainer"></div>
	</main>
</template>

<script>
import Vue from "vue";
import mapboxgl from "mapbox-gl";
// Import popup component & create class for mounting
import ArtworkPopup from "../components/ArtworkPopup";
import { getGeoJSON } from "../utils/api";
const ArtworkPopupClass = Vue.extend(ArtworkPopup);

export default {
	name: "FullMap",
	mounted() {
		// Get API token from .env
		mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;

		// Load map
		this.loadMap().then((map) => {
			// Add points
			this.addPoints(map).then(() => {
				// Add layer with points
				this.addLayer(map);
			});
			// Add interactions
			this.addMouseInteraction(map);
		});
	},
	methods: {
		loadMap() {
			// Async loading function to await styles
			return new Promise((resolve) => {
				// Max Boundaries of map
				var bounds = [
					[-1.167997, 53.91244], // Southwest coordinates
					[-1.005763, 54.00422], // Northeast coordinates
				];
				// Create Map
				let map = new mapboxgl.Map({
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
				map.addControl(
					new mapboxgl.GeolocateControl({
						positionOptions: {
							enableHighAccuracy: true,
						},
						trackUserLocation: true,
					})
				);
				// Resolve Promise when styling is loaded
				map.on("styledata", () => {
					// Send mapBox to pass through to other methods
					resolve(map);
				});

				// When map is fully loaded
				map.on("load", () => {
					// Find if paramater has been passed
					const paramID = this.$route.params.id;
					// If it has,
					if (paramID !== undefined) {
						// Set timeout (avoids async errors, probably a better way)
						// !-See https://github.com/mapbox/mapbox-gl-js/issues/4222#issuecomment-279446075
						setTimeout(function() {
							// Get artworks layer from map
							let features = map.queryRenderedFeatures({
								layers: ["artworks"],
							});
							// Filter markers by param to find matching one
							let marker = features.filter(
								(i) => i.properties.id === paramID
							)[0];
							// !-Fly to location (To be refactored)
							map.flyTo({
								center: marker.geometry.coordinates,
								speed: 0.8,
								zoom: 17,
							});
							// !-Arbitrary timeout
						}, 500);
					}
				});
			});
		},
		async addPoints(map) {
			let data = await getGeoJSON();
			map.addSource("artworks", {
				type: "geojson",
				data: data.data,
				cluster: true,
				clusterMaxZoom: 17, // Max zoom to cluster points on
				clusterRadius: 50, // Radius of each cluster when clustering points
			});
		},
		addLayer(map) {
			map.addLayer({
				id: "clusters",
				type: "circle",
				source: "artworks",
				filter: ["has", "point_count"],
				paint: {
					// 20px circles when point_count is less than 100
					// 30px circles when point_count is between 100 and 750
					// 40px circles when point_count is greater than or equal to 750
					"circle-color": "#e14e6d",
					"circle-radius": [
						"step",
						["get", "point_count"],
						20,
						100,
						30,
						750,
						40,
					],
				},
			});

			map.addLayer({
				id: "cluster-count",
				type: "symbol",
				source: "artworks",
				filter: ["has", "point_count"],
				layout: {
					"text-field": "{point_count_abbreviated}",
					// Uses Mapbox Studio fonts
					"text-font": ["Raleway Bold"],
					"text-size": 22,
				},
				paint: {
					"text-color": "#f9f9f9",
				},
			});

			map.addLayer({
				id: "artworks",
				type: "symbol",
				source: "artworks",
				filter: ["!", ["has", "point_count"]],
				layout: {
					// SVG file loaded into Mapbox Studio style
					"icon-image": "ArtworkMarker",
					// Allow icons to be visible over other icons
					"icon-allow-overlap": true,
					// Why, Mapbox, did it take me an hour to find this property in your docs?
					"icon-anchor": "bottom",
				},
			});
		},
		addMouseInteraction(map) {
			// inspect a cluster on click
			map.on("click", "clusters", function(e) {
				var features = map.queryRenderedFeatures(e.point, {
					layers: ["clusters"],
				});
				var clusterId = features[0].properties.cluster_id;
				map
					.getSource("artworks")
					.getClusterExpansionZoom(clusterId, function(err, zoom) {
						if (err) return;

						map.easeTo({
							center: features[0].geometry.coordinates,
							zoom: zoom,
						});
					});
			});

			map.on("click", "artworks", (e) => {
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
					.addTo(map);

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
				map.flyTo({
					center: e.features[0].geometry.coordinates,
					speed: 0.8,
				});

				// Mount Vue component within the Vue ref div created earlier
				popupInstance.$mount("#vue-popup-content");

				// Update popup after adding content to resize
				popup._update();
			});

			// Change the cursor to a pointer when the mouse is over the artworks layer.
			map.on("mouseenter", "artworks", function() {
				map.getCanvas().style.cursor = "pointer";
			});

			// Change it back to a pointer when it leaves.
			map.on("mouseleave", "artworks", function() {
				map.getCanvas().style.cursor = "";
			});

			// Change the cursor to a pointer when the mouse is over the clusters layer.
			map.on("mouseenter", "clusters", function() {
				map.getCanvas().style.cursor = "pointer";
			});

			// Change it back to a pointer when it leaves.
			map.on("mouseleave", "clusters", function() {
				map.getCanvas().style.cursor = "";
			});
		},
	},
};
</script>

<style>
#map-container {
	width: 100%;
	height: calc(100vh - 90px);
}
.mapboxgl-user-location-dot,
.mapboxgl-user-location-dot::before {
	background-color: var(--red);
}
.mapboxgl-user-location-accuracy-circle {
	background-color: var(--red);
	opacity: 0.2;
}
.mapboxgl-ctrl-group {
	border-radius: 0;
	background: var(--white);
}
</style>
