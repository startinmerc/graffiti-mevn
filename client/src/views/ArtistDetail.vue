<template>
	<main id="artist-detail" class="main--shrink-wide">
		<h1 class="padded">{{ name }}</h1>
		<ul class="artwork-list padded">
			<li v-for="artwork in artworks" :key="artwork._id">
				<h3>{{ artwork.title }}</h3>
				<img v-if="artwork.photos" :src="artwork.photos[0]" alt="artwork" />
				<router-link to="map">View on map</router-link>
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

<style lang="scss">
.artwork-list {
	list-style: none;
	li {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin: var(--padding) 0;
		img {
			max-height: 50vh;
			width: auto;
		}
		* {
			margin: 0;
		}
		&:nth-of-type(even) {
			align-items: flex-end;
		}
	}
}
</style>
