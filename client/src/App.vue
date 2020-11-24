<template>
	<div id="app">
		<Menu />
		<transition :name="transitionName">
			<router-view />
		</transition>
	</div>
</template>

<script>
import Menu from "./components/Menu.vue";

export default {
	name: "App",
	components: {
		Menu,
	},
	data() {
		return {
			transitionName: "",
		};
	},
	watch: {
		// Watch for changes to route
		$route(to, from) {
			// Logic for working out page transition direction
			function direction(to, from) {
				// Extract last page & destination page
				let last = from.path.split("/")[from.path.split("/").length - 1];
				let dest = to.path.split("/")[to.path.split("/").length - 1];

				// If any of these match, swipe left
				if (
					dest === "" ||
					last === "about" ||
					(dest === "map" &&
						from.path.split("/")[from.path.split("/").length - 2] === "artwork")
				) {
					return "left";
				}
				// Otherwise swipe right
				return "right";
			}

			// Apply class name to transition group
			this.transitionName = `swipe-${direction(to, from)}`;
		},
	},
};
</script>

<style lang="scss">
// ============== Root Variables ==============

:root {
	--darkblue: #33405c;
	--lightblue: #afdee4;
	--yellow: #fef05b;
	--red: #e14e6d;
	--black: #221e1d;
	--white: #f9f9f9;
	--padding: 15px;
	--placeholder-gradient: linear-gradient(132.18deg, #33405c 0%, #afdee4 100%);
}

// Extra small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
$breakpoint-sm: 576px;

// Medium devices (tablets, 768px and up)
$breakpoint-md: 768px;

// Large devices (desktops, 992px and up)
$breakpoint-lg: 992px;

// Extra large devices (large desktops, 1200px and up)
$breakpoint-xl: 1200px;

// =============== Style resets ===============

body {
	font-family: "Raleway", sans-serif;
	margin: 0;
	background-color: var(--white);
	overflow-x: hidden;
}

h1,
h2,
h3,
h4,
h5 {
	color: var(--red);
}

button,
.button {
	border: 0;
	border-radius: 500rem;
	background: var(--darkblue);
	color: var(--red);
	font-family: inherit;
	font-size: inherit;
	line-height: 1.2;
	white-space: nowrap;
	text-decoration: none;
	padding: 0.25rem 0.5rem;
	margin: 0.25rem;
	cursor: pointer;
	transition: color 80ms ease-in;

	&:hover {
		color: var(--white);
	}
}

a {
	transition: all 80ms ease-out;
	color: var(--red);
	&:hover,
	&:active {
		background-color: var(--darkblue);
		color: var(--white);
	}
}

// =============== Global Elements ===============

main {
	position: absolute;
	top: 90px;
	width: 100%;
	min-height: calc(100vh - 90px);
	&.padded {
		width: calc(100% - 2 * var(--padding));
	}
}

@media screen and (min-width: 768px) {
	.main--shrink-wide, main.padded {
		width: 80%;
		margin: 0 10%;
	}
}

// Placeholder for artwork image
.placeholder {
	// Gradient backgrounds
	background-image: var(--placeholder-gradient);
}
// Style background image if one is loaded
.placeholder:not(:empty) {
	background-size: cover;
	background-position: center;
	background-color: var(--darkblue);
	background-blend-mode: luminosity;
}

// =============== Helper classes ===============

.padded {
	padding: 0 var(--padding);
}

@media screen and (min-width: 768px) {
	.padded {
		padding: 0;
	}
}

// ============== Page Transitions ==============

:root {
	--page-time: 210ms;
	--page-easing: cubic-bezier(0.19, 1, 0.22, 1);
}

.swipe-right-enter-active {
	animation: rightComing var(--page-time) var(--page-easing);
}
.swipe-right-leave-active {
	animation: rightGoing var(--page-time) var(--page-easing);
}

@keyframes rightGoing {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-100%);
	}
}

@keyframes rightComing {
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0%);
	}
}

.swipe-left-enter-active {
	animation: leftComing var(--page-time) var(--page-easing);
}
.swipe-left-leave-active {
	animation: leftGoing var(--page-time) var(--page-easing);
}

@keyframes leftGoing {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(100%);
	}
}

@keyframes leftComing {
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(0%);
	}
}
</style>
