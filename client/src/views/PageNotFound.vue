<template>
	<main id="page-not-found" class="main--shrink-wide">
		<h1>404</h1>
		<p>Page not found...</p>
		<router-link :to="{ name: 'Homepage' }">Back to homepage</router-link>
	</main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#page-not-found {
	display: grid;
	place-items: center;
	h1 {
		font-size: 12rem;
    margin: 0;
	}
}
</style>
