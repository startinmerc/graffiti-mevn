<template>
	<div class="artwork-popup">
		<div
			class="placeholder"
			:style="photos.length > 0 && { backgroundImage: `url(${photos[0].url}` }"
		>
			<div
				v-if="photos.length > 0"
				:style="
					photos.length > 0 && { backgroundImage: `url(${photos[0].url}` }
				"
				alt="artwork"
				class="popup__image"
			></div>
		</div>
		<h3>{{ title }}</h3>
		<p>{{ artist.name }}</p>
		<!-- Can't be router-link as mounted after render -->
		<!-- (Thanks, mapbox :face_with_rolling_eyes:) -->
		<button @click="viewDetail">
			View Detail
			<icon-base icon-name="arrow-right" height="15" width="15">
				<ArrowRight />
			</icon-base>
		</button>
	</div>
</template>

<script>
import IconBase from "./icons/IconBase";
import ArrowRight from "./icons/ArrowRight";
import router from "../router";

export default {
	name: "ArtworkPopup",
	props: {
		title: String,
		artist: Object,
		id: String,
		photos: Array,
		description: String,
	},
	components: {
		IconBase,
		ArrowRight,
	},
	methods: {
		viewDetail() {
			router.push({
				name: "ArtworkDetail",
				params: {
					id: this.id,
					title: this.title,
					artist: this.artist,
					description: this.description,
					photos: this.photos,
				},
			});
		},
	},
};
</script>

<style lang="scss">
@keyframes popup {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
.mapboxgl-popup {
	--padding: 5px;
	.placeholder {
		min-height: 100px;
		// Widen to compensate for .mapbox-popup-content padding
		width: calc(100% + var(--padding) * 2);
		margin-left: calc(0px - var(--padding));
		margin-top: calc(0px - var(--padding));
	}
}
.mapboxgl-popup-tip {
	display: none;
}
.mapboxgl-popup-content {
	padding: var(--padding);
	border-radius: 0;
	box-shadow: none;
	animation: popup 280ms ease-in forwards;
	font: 1.1rem "Raleway", sans-serif;
	background-color: var(--white);
	border: 5px solid var(--red);
	button {
		margin: 0;
	}
	h3,
	p {
		margin: var(--padding) 0;
	}
	h3 {
		font-size: 1.2rem;
	}
}
.mapboxgl-popup-close-button {
	margin: 0;
}
.popup__image {
	min-height: 100px;
	background-position: center;
	background-size: cover;
}
</style>
