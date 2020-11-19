<template>
	<main>
		<h1>Submit an artwork</h1>
		<form @submit.prevent="submitForm">
			<div class="form-group">
				<label for="title">Title</label>
				<input type="text" v-model="title" placeholder="Artwork Title" />
			</div>
			<div class="form-group">
				<select v-model="selectedArtist">
					<option disabled value="">Please select one</option>
					<option
						v-for="artist in artists"
						:key="artist._id"
						:value="artist._id"
						>{{ artist.name }}</option
					>
				</select>
			</div>
			<div class="form-group">
				<label for="description">Description</label>
				<input
					type="text"
					v-model="description"
					placeholder="Artwork Description"
				/>
			</div>
			<div class="form-group">
				<label for="photo">Upload photo</label>
				<input type="file" @change="selectPhoto" ref="photo" accept="image/*" />
			</div>
			<div class="form-group">
				<label for="coord_long">
					Longitude
				</label>
				<input
					type="number"
					name="coord_long"
					v-model="coord_long"
					placeholder="Number"
					min="-1.167997"
					max="-1.005763"
					step="0.000001"
				/>
			</div>
			<div class="form-group">
				<label for="coord_lat">
					Latitude
				</label>
				<input
					type="number"
					name="coord_lat"
					v-model="coord_lat"
					placeholder="Number"
					min="53.912440"
					max="54.004229"
					step="0.000001"
				/>
			</div>
			<button type="submit">Submit Artwork</button>
		</form>
	</main>
</template>

<script>
import { getAllArtists } from "../utils/api";

export default {
	name: "SubmitArtwork",
	data: function() {
		return {
			artists: [],
			title: "",
			selectedArtist: "",
			description: "",
			photo: null,
			coord_long: -1.080278,
			coord_lat: 53.958332,
		};
	},
	async mounted() {
		this.artists = await getAllArtists();
	},
	methods: {
		selectPhoto(event) {
			this.photo = event.target.files[0];
		},
		async submitForm() {
			console.table([
				{ name: "title", data: this.title },
				{ name: "artist", data: this.selectedArtist },
				{ name: "description", data: this.description },
				{ name: "photo", data: this.photo.name },
				{ name: "long", data: this.coord_long },
				{ name: "lat", data: this.coord_lat },
			]);
		},
	},
};
</script>

<style></style>
