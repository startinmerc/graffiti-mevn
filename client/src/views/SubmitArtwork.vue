<template>
	<main id="submit-artwork" class="main--shrink-wide">
		<h1>Submit an artwork</h1>
		<form @submit.prevent="submitForm" enctype="multipart/form-data">
			<div class="form-group">
				<label for="title">Title</label>
				<input type="text" v-model="title" placeholder="Artwork Title" />
			</div>
			<div class="form-group">
				<label for="artist">Artist</label>
				<select v-model="selectedArtist">
					<option disabled value="">Please select one</option>
					<option
						v-for="artist in artists"
						:key="artist._id"
						:value="artist._id"
						>{{ artist.name }}</option
					>
					<option :value="null">Other...</option>
				</select>
			</div>
			<div v-if="selectedArtist === null">
				<label for="newArtist"
					>New Artist:
					<input
						type="text"
						name="newArtist"
						id="newArtist"
						v-model="newArtist"
					/>
				</label>
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
			<p v-if="exif === 'missing'">Geodata missing from image</p>
			<div v-if="exif === 'missing'" class="form-group">
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
			<div v-if="exif === 'missing'" class="form-group">
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
		<div v-if="submitted">
			<p>Submitted!</p>
			<router-link
				:to="{ name: 'ArtworkOnMap', params: { artworkID: newArtworkID } }"
				>View on map</router-link
			>
		</div>
		<p v-if="error">Upload failed :(</p>
		<ErrorMessage
			v-if="error"
			@close="error = false"
			:status="errorMessage.status"
			:message="errorMessage.message"
		/>
	</main>
</template>

<script>
import EXIF from "exif-js";
import { getAllArtists, postArtist, postArtwork } from "../utils/api";
import ErrorMessage from "../components/ErrorMessage";

export default {
	name: "SubmitArtwork",
	components: { ErrorMessage },
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
			newArtworkID: null,
			exif: null,
			newArtist: null,
			error: false,
			errorMessage: {},
		};
	},
	async mounted() {
		this.artists = await getAllArtists();
	},
	methods: {
		selectPhoto(event) {
			this.photo = event.target.files[0];
			let vm = this;
			EXIF.getData(event.target.files[0], function() {
				if (this.exifdata.GPSLongitude && this.exifdata.GPSLatitude) {
					vm.exif = this.exifdata;
					vm.coord_long = vm.convertGPS(
						vm.exif.GPSLongitude,
						vm.exif.GPSLongitudeRef
					);
					vm.coord_lat = vm.convertGPS(
						vm.exif.GPSLatitude,
						vm.exif.GPSLatitudeRef
					);
				} else {
					vm.exif = "missing";
				}
			});
		},
		convertGPS(arr, pole) {
			let dec = arr[0] + arr[1] / 60 + arr[2] / 3600;
			return pole === "S" || pole === "W"
				? dec.toFixed(6) * -1
				: dec.toFixed(6) * 1;
		},
		async submitForm() {
			let formData = new FormData();
			formData.append("title", this.title);
			formData.append("description", this.description);
			formData.append("photo", this.photo);
			formData.append("coord_long", this.coord_long);
			formData.append("coord_lat", this.coord_lat);
			if (this.newArtist) {
				let i = await postArtist({ name: this.newArtist });
				formData.append("artist", i._id);
			} else {
				formData.append("artist", this.selectedArtist);
			}
			try {
				this.sending = true;
				let res = await postArtwork(formData);
				this.handleSuccess(res);
			} catch (err) {
				this.sending = false;
				this.errorMessage = err;
				this.error = true;
			}
		},
		handleSuccess(res) {
			this.newArtworkID = res._id;
			this.sending = false;
			this.submitted = true;
			this.resetForm();
		},
		resetForm() {
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

<style lang="scss">
#submit-artwork {
	text-align: center;
	form {
		font-size: 1.1rem;
	}
	.form-group {
		padding: var(--padding);
		label {
			display: block;
		}
	}
	input,
	select {
		font-size: inherit;
	}
}
</style>
