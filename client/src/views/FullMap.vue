<template>
	<main id="full-map">
		<div id="map-container" ref="mapContainer"></div>
	</main>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { getGeoJSON } from "../utils/api";
import {
	addArtworkPopupAndZoom,
	addArtworksLayer,
	addClusterLayers,
	addCursorPointer,
	clusterClickHandler,
} from "../utils/mapbox";

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
					if (paramID) {
						// Get source, find matched marker data
						let data = map
							.getSource("artworks")
							._data.features.find((v) => v.properties.id === paramID);
						// !-Convert photos array back to JSON string for ArtworkPopup
						// !-To change
						data.properties.photos = JSON.stringify(data.properties.photos);
						addArtworkPopupAndZoom(map, { features: [data] });
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
