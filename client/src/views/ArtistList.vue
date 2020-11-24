<template>
	<main class="main--shrink-wide padded">
		<h1>Artists</h1>
		<ul class="artist-list">
			<li
				class="placeholder"
				v-for="artist in artists"
				:key="artist._id"
				:style="{ backgroundImage: `${getRandomPhoto(artist.artworks)}` }"
			>
				<router-link
					:to="{ name: 'ArtistDetail', params: { artistID: artist._id } }"
					>{{ artist.name }}</router-link
				>
			</li>
		</ul>
		<ErrorMessage
			v-if="error"
			@close="error = false"
			:status="errorMessage.status"
			:message="errorMessage.message"
		/>
	</main>
</template>

<script>
import { getAllArtists } from "../utils/api";
import ErrorMessage from "../components/ErrorMessage";

export default {
	name: "ArtistList",
	components: {
		ErrorMessage,
	},
	async mounted() {
		try {
			this.artists = await getAllArtists();
		} catch (err) {
			this.error = true;
			this.errorMessage = err;
		}
	},
	data: function() {
		return {
			artists: {},
			error: false,
			errorMessage: {},
		};
	},
	methods: {
		// Gets random photo from random artwork in supplied array
		getRandomPhoto(artworks) {
			let artwork =
				artworks[this.getRandomIntInclusive(0, artworks.length - 1)];
			if (artwork.photos.length < 1) {
				return "var(--placeholder-gradient)";
			}
			let url =
				artwork.photos[this.getRandomIntInclusive(0, artwork.photos.length - 1)]
					.url;
			return `url(${url}`;
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

<style lang="scss">
.artist-list {
	list-style: none;
	padding: 0;
	li {
		height: 30vh;
		margin: 10px 0;
		display: grid;
		place-items: center;
		a {
			font-size: 1.7rem;
			display: inline-block;
			background: var(--white);
			padding: 3rem 0;
			width: 70%;
			text-align: center;
			&:hover,
			&:active {
				background: var(--red);
			}
		}
	}
}
</style>
