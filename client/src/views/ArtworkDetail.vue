<template>
	<main id="artwork-detail" class="main--shrink-wide">
		<div
			class="placeholder"
			:style="photos && { backgroundImage: `url(${photos[0]}` }"
		>
			<!-- Show photo if found -->
			<img v-if="photos" :src="photos[0]" alt="artwork" />
		</div>
		<div class="padded">
			<h1>{{ title }}</h1>
			<b v-if="artist">{{ artist }}</b>
			<p v-if="description">{{ description }}</p>
			<router-link to="/map" class="button">
				<icon-base icon-name="arrow-right" height="15" width="15">
					<ArrowRight />
				</icon-base>
				Back to map
			</router-link>
		</div>
	</main>
</template>

<script>
import IconBase from "../components/icons/IconBase";
import ArrowRight from "../components/icons/ArrowRight";
import { geoData } from "../../data";

export default {
	name: "ArtworkDetail",
	data: function() {
		return {
			title: "Artwork not found",
			artist: undefined,
			description: undefined,
			photos: undefined,
		};
	},
	components: {
		IconBase,
		ArrowRight,
	},
	mounted() {
		// If title (therefore others) not present...
		if (!this.$route.params.title) {
			// Find in geoData based on id from param
			let res = geoData.data.features.find(
				(v) => v.properties.id === this.$route.params.id
			);
			// If nothing found, return & page gets default 'not found' data
			if (!res) {
				return;
			}

			// Set data to found properties
			this.title = res.properties.title;
			this.description = res.properties.description;
			this.artist = res.properties.artist;
			this.photos = res.properties.photos;
		} else {
			// Set data to param properties
			this.title = this.$route.params.title;
			this.description = this.$route.params.description;
			this.artist = this.$route.params.artist;
			this.photos = JSON.parse(this.$route.params.photos);
		}
	},
};
</script>

<style scoped>
img {
	width: auto;
	max-height: 40vh;
	margin: 0 auto;
	display: block;
}
.placeholder {
	height: 40vh;
	width: 100%;
}
.button svg {
	transform: rotate(180deg);
}
</style>
