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
	map.on("click", "clusters", function(e) {
		// Get cluster at selected point
		var features = map.queryRenderedFeatures(e.point, {
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
