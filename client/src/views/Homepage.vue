<template>
	<main id="homepage">
		<h1>
			York<br />
			Graffiti<br />
			Explorer
		</h1>
		<router-link to="/map" class="button">
				View the map
				<icon-base icon-name="arrow-right">
					<ArrowRight />
				</icon-base>
		</router-link>
	</main>
</template>

<script>
import IconBase from "../components/icons/IconBase";
import ArrowRight from "../components/icons/ArrowRight";
export default {
	name: "Homepage",
	components: {
		IconBase,
		ArrowRight,
	},
};
</script>

<style scoped lang="scss">
main {
	text-align: center;
	color: var(--red);
	overflow: hidden;
	background: no-repeat center center;
	background-image: url("../assets/Homepage.jpg");
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	h1 {
		font-size: 4rem;
		background: var(--darkblue);
		padding: 2rem;
		display: inline-block;
		margin-bottom: 10vh;
		margin-top: 0;
		text-align: left;
	}
	.button {
		font-size: 1.5rem;
	}
}
</style>
