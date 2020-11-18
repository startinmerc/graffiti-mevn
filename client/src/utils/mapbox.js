// Generated URL using container's dimentions for image size
// this.$refs.mapContainer.clientWidth
// this.$refs.mapContainer.clientHeight
export function getStaticUrl(width, height) {
	return `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-1.0803,53.9583,12,0/${Math.min(
		width,
		1280
	)}x${height}?access_token=${process.env.VUE_APP_MAPBOX_TOKEN}`;
}

export function addPointer(map, layerName) {
	// Change the cursor to a pointer when the mouse is over the artworks layer.
	map.on("mouseenter", layerName, function() {
		map.getCanvas().style.cursor = "pointer";
	});

	// Change it back to a pointer when it leaves.
	map.on("mouseleave", layerName, function() {
		map.getCanvas().style.cursor = "";
	});
}
