<template>
	<nav>
		<p id="nav-logo">
			<router-link to="/">York<br />Graffiti<br />Explorer</router-link>
		</p>
		<button @click="toggleMenu" role="show menu">
			<MenuIcon :menuOpen="menuOpen" />
		</button>
		<transition name="menuSlide">
			<div class="menu" v-if="menuOpen" @click="toggleMenu">
				<div class="backdrop"></div>
				<ul>
					<li><router-link to="/">Home</router-link></li>
					<li><router-link to="/map">Map</router-link></li>
					<li><router-link to="/artists">Artists</router-link></li>
					<li><router-link to="/about">About</router-link></li>
				</ul>
			</div>
		</transition>
	</nav>
</template>

<script>
import MenuIcon from "./MenuIcon";

export default {
	name: "Menu",
	components: {
		MenuIcon,
	},
	data: function() {
		return {
			menuOpen: false,
		};
	},
	methods: {
		toggleMenu() {
			this.menuOpen = !this.menuOpen;
		},
	},
};
</script>

<style lang="scss">
nav {
	// !-Not sticking atm, to look in to at some point
	position: sticky;
	top: 0;
	left: 0;
	z-index: 3;
	// Fixed height for easier <main>s spacing
	height: 60px;
	width: calc(100% - var(--padding) * 2);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: var(--padding);
	background-color: var(--darkblue);
	color: var(--red);

	#nav-logo {
		margin: 0;
		a {
			text-decoration: none;
		}
	}
}

@media screen and (min-width: 768px) {
	nav {
		width: 90%;
		padding: var(--padding) 5%;
	}
}

// =============== Dropdown menu ===============
nav {
	.menu {
		position: absolute;
		top: 100%;
		right: 0;
		display: grid;
		grid-template-columns: 1fr auto;
		width: 100%;
		ul {
			width: 50vw;
			max-width: 300px;
			// Full height minus header
			height: calc(100vh - 90px);
			background: var(--red);
			margin: 0;
			padding: 0;
			list-style: none;
			font-size: 1.3rem;
			li {
				a {
					padding: var(--padding);
					display: inline-block;
					width: calc(100% - 30px);
					color: var(--darkblue);
					transition: background-color 80ms ease-in;
					&:hover, &:active {
						background-color: var(--white);
					}
				}
			}
		}
		// Filler div to extend click listener
		.backdrop {
			height: 100%;
		}
	}
}

// ================= Transitions =================

.menuSlide-enter-active {
	animation: slideIn 210ms ease-in forwards;
}
.menuSlide-leave-active {
	animation: slideOut 210ms ease-in forwards;
}

@keyframes slideIn {
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0%);
	}
}

@keyframes slideOut {
	from {
		transform: translateX(0%);
	}
	to {
		transform: translateX(100%);
	}
}
</style>
