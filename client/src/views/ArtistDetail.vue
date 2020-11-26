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
			<p v-if="artworks.length < 1 && !errorMessage">{{name}} does not have any artworks posted yet.</p>
			<p v-if="artworks.length < 1 && !errorMessage">Found one? <router-link :to="{name: 'SubmitArtwork'}">Submit it!</router-link></p>
		</ul>
		<!-- !-To implement -->
		<!-- <router-link
			v-if="name"
			:to="{ name: 'ArtistOnMap', params: { artistID: name } }"
			>View artworks on map</router-link
		> -->
		<ErrorMessage
			v-if="error"
			@close="error = false"
			:status="errorMessage.status"
			:message="errorMessage.message"
		/>
		<router-link v-if="errorMessage.status" :to="{name: 'FullMap'}">Back to map</router-link>
	</main>
</template>

<script>
import ErrorMessage from "../components/ErrorMessage";
import { getArtist } from "../utils/api";

export default {
	components: { ErrorMessage },
	name: "ArtistDetail",
	data: function() {
		return {
			name: "",
			artworks: [],
			error: false,
			errorMessage: false,
		};
	},
	mounted: function() {
		this.findArtist();
	},
	methods: {
		async findArtist() {
			try {
				// API call to find artist from supplied id
				let artist = await getArtist(this.$route.params.artistID);
				// Set data
				this.name = artist.name;
				this.artworks = artist.artworks;
				document.title = `${this.name} - York Graffiti Explorer`;
			} catch (err) {
				this.errorMessage = err;
				this.name = err.message;
				this.error = true;
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
