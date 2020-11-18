<template>
	<main id="full-map">
		<div id="map-container" ref="mapContainer"></div>
	</main>
</template>

<script>
import mapboxgl from "mapbox-gl";
import {
	addArtworkPopupAndZoom,
	addArtworksLayer,
	addClusterLayers,
	addCursorPointer,
	clusterClickHandler,
	handleArtworkParam,
	loadArtworks,
} from "../utils/mapbox";

export default {
	name: "FullMap",
	async mounted() {
		// Get API token from .env
		mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;
		// Load map
		let map = await this.loadMap();
		// Load map points
		await this.addPoints(map);
		// Add layer with points
		this.addLayers(map);
		// Add interactions
		this.addMouseInteraction(map);
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
				// Resolve Promise when styling is loaded,
				// Prevents Vue error
				map.on("styledata", () => {
					// Send mapBox to pass through to other methods
					resolve(map);
				});

				// When map is fully loaded
				map.on("load", () => {
					// Find if paramater has been passed
					if (this.$route.params.id) {
						// If it has, execute handler
						handleArtworkParam(map, this.$route.params.id);
					}
				});
			});
		},
		async addPoints(map) {
			await loadArtworks(map);
		},
		addLayers(map) {
			// Adds 2 layers: "clusters" + "cluster-count"
			addClusterLayers(map);
			// Adds 1 layer: "artworks"
			addArtworksLayer(map);
		},
		addMouseInteraction(map) {
			// inspect a cluster on click
			clusterClickHandler(map);

			// Add popup & zoom to marker on click
			map.on("click", "artworks", function(e) {
				addArtworkPopupAndZoom(map, e);
			});

			// Add cursor change listeners to layers
			addCursorPointer(map, ["artworks", "clusters"]);
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
