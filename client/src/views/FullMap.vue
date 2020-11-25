<template>
	<main id="full-map">
		<div id="map-container" ref="mapContainer"></div>
		<ErrorMessage
			v-if="error"
			@close="error = false"
			:status="errorMessage.status"
			:message="errorMessage.message"
		/>
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
	createMap,
	loadArtworks,
} from "../utils/mapbox";
import ErrorMessage from "../components/ErrorMessage";

export default {
	name: "FullMap",
	components: {
		ErrorMessage,
	},
	data() {
		return {
			error: false,
			errorMessage: {},
		};
	},
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
	// watch: {
	// 	// !-Watch route for changes,
	// 	// !-Will refresh map or act on params eventually
	// 	$route: function(){console.log(this.$route.params)},
	// },
	methods: {
		loadMap() {
			return createMap({
				bounds: [
					[-1.167997, 53.91244], // Southwest coordinates
					[-1.005763, 54.00422], // Northeast coordinates
				],
				center: [-1.080278, 53.958332],
				params: this.$route.params,
			});
		},
		async addPoints(map) {
			try {
				await loadArtworks(map);
			} catch (err) {
				this.error = true;
				this.errorMessage = err;
			}
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
