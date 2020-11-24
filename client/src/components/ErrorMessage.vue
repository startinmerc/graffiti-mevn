<template>
	<div class="error">
		<p :style="{ marginTop: 0 }">Error {{ status }}:</p>
		<p :style="{ marginBottom: 0 }">{{ message }}</p>
		<button @click.prevent="$emit('close')">Close</button>
	</div>
</template>

<script>
export default {
	name: "ErrorMessage",
	props: {
		status: Number,
		message: String,
	},
};
</script>

<style>
.error {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	background-color: var(--yellow);
	padding: var(--padding);
	box-shadow: 0px 3px 8px var(--darkblue);
}
</style>
