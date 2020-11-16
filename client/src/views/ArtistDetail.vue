<template>
	<main id="artist-detail" class="main--shrink-wide">
		<h1>{{ name }}</h1>
		<ul>
			<li v-for="artwork in artworks" :key="artwork._id">
				{{ artwork.title }}
			</li>
		</ul>
	</main>
</template>

<script>
import axios from "axios";

export default {
	name: "ArtistDetail",
	data: function() {
		return {
			name: "Artist not found",
			artworks: [],
		};
	},
	mounted: function() {
		this.findArtist();
	},
	methods: {
		findArtist() {
			axios
				.get(`http://localhost:8081/api/artists/${this.$route.params.id}`)
				.then((response) => {
					if (response.data !== {}) {
						this.name = response.data.name;
						this.artworks = response.data.artworks;
					}
				});
		},
	},
};
</script>

<style></style>
