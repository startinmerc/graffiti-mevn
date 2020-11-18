import Vue from "vue";
import mapboxgl from "mapbox-gl";
// Import popup component & create class for mounting
import ArtworkPopup from "../components/ArtworkPopup";
const ArtworkPopupClass = Vue.extend(ArtworkPopup);

// =============

// Generated URL using container's dimentions for image size
// this.$refs.mapContainer.clientWidth
// this.$refs.mapContainer.clientHeight
export function getStaticUrl(width, height) {
	return `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-1.0803,53.9583,12,0/${Math.min(
		width,
		1280
	)}x${height}?access_token=${process.env.VUE_APP_MAPBOX_TOKEN}`;
}

// Accepts one or many layer ids
export function addCursorPointer(map, [...layers]) {
	layers.forEach((layer) => {
		// Change the cursor to a pointer when the mouse is over the layer.
		map.on("mouseenter", layer, function() {
			map.getCanvas().style.cursor = "pointer";
		});

		// Change it back to a pointer when it leaves.
		map.on("mouseleave", layer, function() {
			map.getCanvas().style.cursor = "";
		});
	});
}

// Click handler for "cluster" layer
export function clusterClickHandler(map) {
	map.on("click", "clusters", function(event) {
		// Get cluster at selected point
		var features = map.queryRenderedFeatures(event.point, {
			layers: ["clusters"],
		});
		// Extract ID
		var clusterId = features[0].properties.cluster_id;
		// Find zoom level needed to show all points
		map
			.getSource("artworks")
			.getClusterExpansionZoom(clusterId, function(err, zoom) {
				if (err) return;
				// Fly to zoom level needed
				map.easeTo({
					center: features[0].geometry.coordinates,
					zoom: zoom,
				});
			});
	});
}

export function addArtworkPopupAndZoom(map, event) {
	// Coordinates from event
	let coordinates = event.features[0].geometry.coordinates.slice();
	// Data from event trigger
	let title = event.features[0].properties.title;
	let artist = event.features[0].properties.artist;
	let description = event.features[0].properties.description;
	let id = event.features[0].properties.id;
	let photos = event.features[0].properties.photos;

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
		center: coordinates,
		speed: 0.8,
		zoom: 17,
	});

	// Mount Vue component within the Vue ref div created earlier
	popupInstance.$mount("#vue-popup-content");

	// Update popup after adding content to resize
	popup._update();
}

export function addClusterLayers(map) {
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
			"circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
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
}

export const addArtworksLayer = (map) => {
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
};
