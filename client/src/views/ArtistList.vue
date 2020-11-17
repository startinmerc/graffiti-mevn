<template>
	<main>
		<h1>Artists</h1>
		<ul>
			<li v-for="artist in artists" :key="artist._id">
				<router-link :to="`/artist/${artist._id}`">{{ artist.name }}</router-link>
			</li>
		</ul>
	</main>
</template>

<script>
import { getAllArtists } from "../utils/api";

export default {
	name: "ArtistList",
	async mounted() {
		this.artists = await getAllArtists();
	},
	data: function() {
		return {
			artists: {},
		};
	},
	methods: {
		// Gets random photo from random artwork in supplied array
		getRandomPhoto(artworks) {
			let artwork =
				artworks[this.getRandomIntInclusive(0, artworks.length - 1)];
			let url =
				artwork.photos[
					this.getRandomIntInclusive(0, artwork.photos.length - 1)
				];
			return url;
		},
		// MATHS
		getRandomIntInclusive(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
	},
};
</script>

<style></style>
