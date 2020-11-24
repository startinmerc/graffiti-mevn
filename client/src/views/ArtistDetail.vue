<template>
	<main id="artist-detail" class="main--shrink-wide">
		<h1 class="padded">{{ name }}</h1>
		<ul class="artwork-list">
			<li v-for="artwork in artworks" :key="artwork._id">
				<router-link
					:to="{ name: 'ArtworkDetail', params: { artworkID: artwork._id } }"
					><h3>{{ artwork.title }}</h3>
					<div class="placeholder">
						<img
							v-if="artwork.photos.length > 0"
							:src="artwork.photos[0].url"
							alt="artwork"
						/>
					</div>
				</router-link>
				<p>
					<router-link
						:to="{ name: 'ArtworkOnMap', params: { artworkID: artwork._id } }"
						>View on map</router-link
					>
				</p>
			</li>
		</ul>
		<!-- !-To implement -->
		<!-- <router-link
			v-if="name"
			:to="{ name: 'ArtistOnMap', params: { artistID: name } }"
			>View artworks on map</router-link
		> -->
	</main>
</template>

<script>
import { getArtist } from "../utils/api";

export default {
	name: "ArtistDetail",
	data: function() {
		return {
			name: "",
			artworks: [],
		};
	},
	mounted: function() {
		this.findArtist();
	},
	methods: {
		async findArtist() {
			// API call to find artist from supplied id
			let artist = await getArtist(this.$route.params.artistID);
			// If result found
			if (artist) {
				// Set data
				this.name = artist.name;
				this.artworks = artist.artworks;
			} else {
				// Otherwise set not found
				this.name = "Artist not found";
			}
		},
	},
};
</script>

<style lang="scss">
.artwork-list {
	list-style: none;
	padding: 0;
	li {
		padding: var(--padding);
		transition: all 230ms ease-in;
		.placeholder {
			&:empty {
				height: 30vh;
				min-height: 200px;
				width: 25vw;
				min-width: 200px;
			}
			&:not(:empty) {
				background: none;
			}
		}
		img {
			display: inline-block;
			max-height: 50vh;
			width: auto;
			transform-origin: center;
			z-index: -1;
		}
		* {
			margin: 0;
		}
		&:nth-of-type(even) {
			text-align: right;
		}
		&:hover {
			background: var(--darkblue);
			img {
				filter: grayscale(0.2);
			}
		}
	}
}

@media screen and (min-width: 768px) {
	.artwork-list {
		li {
			display: inline-block;
			&:nth-of-type(even) {
				text-align: left;
			}
		}
	}
}
</style>
