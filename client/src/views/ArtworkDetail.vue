<template>
	<main id="artwork-detail" class="main--shrink-wide">
		<div
			class="placeholder"
			:style="photos.length > 0 && { backgroundImage: `url(${photos[0].url}` }"
		>
			<!-- Show photo if found -->
			<img v-if="photos.length > 0" :src="photos[0].url" alt="artwork" />
		</div>
		<div class="padded">
			<h1>{{ title }}</h1>
			<p>
				<router-link
					v-if="artist"
					:to="{ name: 'ArtistDetail', params: { artistID: artist._id } }"
					><b>{{ artist.name }}</b></router-link
				>
			</p>
			<p v-if="description">{{ description }}</p>
			<router-link :to="{ name: 'FullMap' }" class="button">
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
import { getArtwork } from "../utils/api";

export default {
	name: "ArtworkDetail",
	data: function() {
		return {
			title: "",
			artist: "",
			description: "",
			photos: [],
		};
	},
	components: {
		IconBase,
		ArrowRight,
	},
	mounted() {
		// If title (therefore others) not present...
		if (!this.$route.params.title) {
			this.findArtwork();
		} else {
			// Set data to param properties
			this.title = this.$route.params.title;
			this.description = this.$route.params.description;
			this.artist = this.$route.params.artist;
			this.photos = this.$route.params.photos;
		}
	},
	methods: {
		async findArtwork() {
			let artwork = await getArtwork(this.$route.params.artworkID);
			if (artwork) {
				this.title = artwork.title;
				this.description = artwork.description;
				this.artist = artwork.artist;
				this.photos = artwork.photos;
			} else {
				this.title = "Artwork not found";
			}
		},
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
