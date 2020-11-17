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
  data: function(){
    return {
      artists: {}
    }
  }
};
</script>

<style></style>
