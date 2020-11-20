<template>
	<main>
		<h1>Submit an artwork</h1>
		<form @submit.prevent="submitForm" enctype="multipart/form-data">
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
		<p v-if="sending">Sending...</p>
		<p v-if="submitted">Submitted!</p>
	</main>
</template>

<script>
import { getAllArtists, postArtwork } from "../utils/api";

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
			sending: false,
			submitted: false,
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
			let formData = new FormData();
			formData.append("title", this.title);
			formData.append("description", this.description);
			formData.append("artist", this.selectedArtist);
			formData.append("photo", this.photo);
			formData.append("coord_long", this.coord_long);
			formData.append("coord_lat", this.coord_lat);
			try {
				this.sending = true;
				let res = await postArtwork(formData);
				this.handleSuccess(res);
			} catch (err) {
				console.log(err);
			}
		},
		handleSuccess(res) {
			console.log(res);
			this.sending = false;
			this.submitted = true;
			this.artists = [];
			this.title = "";
			this.selectedArtist = "";
			this.description = "";
			this.photo = null;
			this.coord_long = -1.080278;
			this.coord_lat = 53.958332;
		},
	},
};
</script>

<style></style>