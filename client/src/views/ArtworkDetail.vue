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
					v-if="artist !== null && artist._id"
					:to="{ name: 'ArtistDetail', params: { artistID: artist._id } }"
					><b>{{ artist.name }}</b></router-link
				>
				<b v-else>{{ artist }}</b>
			</p>
			<p v-if="description">{{ description }}</p>
			<router-link :to="{ name: 'FullMap' }" class="button">
				<icon-base icon-name="arrow-right" height="15" width="15">
					<ArrowRight />
				</icon-base>
				Back to map
			</router-link>
		</div>
		<ErrorMessage
			v-if="error"
			@close="error = false"
			:status="errorMessage.status"
			:message="errorMessage.message"
		/>
	</main>
</template>

<script>
import IconBase from "../components/icons/IconBase";
import ArrowRight from "../components/icons/ArrowRight";
import { getArtwork } from "../utils/api";
import ErrorMessage from "../components/ErrorMessage";

export default {
	name: "ArtworkDetail",
	data: function() {
		return {
			title: null,
			artist: null,
			description: null,
			photos: [],
			error: false,
			errorMessage: {},
		};
	},
	components: {
		IconBase,
		ArrowRight,
		ErrorMessage,
	},
	mounted() {
		// If title (therefore others) not present...
		if (!this.$route.params.title) {
			this.findArtwork();
		} else {
			// Set data to param properties
			this.title = this.$route.params.title || "No Title";
			this.description = this.$route.params.description || "No description";
			this.artist = this.$route.params.artist || "No Artist";
			this.photos = this.$route.params.photos || [];
		}
	},
	methods: {
		async findArtwork() {
			try {
				let artwork = await getArtwork(this.$route.params.artworkID);
				this.title = artwork.title || "No Title";
				this.description = artwork.description || "No description";
				this.artist = artwork.artist || "No Artist";
				this.photos = artwork.photos || [];
				document.title = `${this.title} - York Graffiti Explorer`;
			} catch (err) {
				this.errorMessage = err;
				this.title = err.message;
				this.error = true;
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
