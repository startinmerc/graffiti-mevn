<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 20 20"
		aria-labelledby="menu-icon"
		role="presentation"
		:class="this.menuOpen ? 'menu--open' : 'menu--closed'"
	>
		<title id="menu-icon" lang="en">Menu toggle icon</title>
		<g
			class="menu__bars"
			fill="currentColor"
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
			<path d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
			<path d="M3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
		</g>
		<g
			class="menu__cross"
			fill="currentColor"
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<path
				d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
			/>
		</g>
	</svg>
</template>

<script>
export default {
	props: ["menuOpen"],
};
</script>

<style lang="scss">
.menu__bars,
.menu__cross {
	transition: transform 210ms ease-out;
	transform-origin: center;
}

// ================= Transitions =================

// Spin & scale SVG path groups
.menu--open {
	.menu__bars {
		transform: scale(0) rotate(-180deg);
	}
	.menu__cross {
		transform: scale(1) rotate(0deg);
	}
}
.menu--closed {
	.menu__bars {
		transform: scale(1) rotate(0deg);
	}
	.menu__cross {
		transform: scale(0) rotate(180deg);
	}
}
</style>
