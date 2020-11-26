import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";
import About from "../views/About.vue";
import FullMap from "../views/FullMap.vue";
import ArtworkDetail from "../views/ArtworkDetail.vue";
import ArtistDetail from "../views/ArtistDetail.vue";
import ArtistList from "../views/ArtistList.vue";
import SubmitArtwork from "../views/SubmitArtwork.vue";
import PageNotFound from "../views/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Homepage",
		component: Homepage,
		meta: {
			title: "York Graffiti Explorer",
		},
	},
	{
		path: "/about",
		name: "About",
		component: About,
		meta: {
			title: "About - York Graffiti Explorer",
		},
	},
	{
		path: "/map",
		name: "FullMap",
		component: FullMap,
		meta: {
			title: "Map - York Graffiti Explorer",
		},
	},
	{
		path: "/map/:artworkID",
		name: "ArtworkOnMap",
		component: FullMap,
		meta: {
			title: "Map - York Graffiti Explorer",
		},
	},
	// {
	// 	path: "/map/:artistID",
	// 	name: "ArtistOnMap",
	// 	component: FullMap,
	// },
	{
		path: "/artwork/new",
		name: "SubmitArtwork",
		component: SubmitArtwork,
		alias: "/artworks/new",
		meta: {
			title: "Submit New Artwork - York Graffiti Explorer",
		},
	},
	{
		path: "/artwork/:artworkID",
		name: "ArtworkDetail",
		component: ArtworkDetail,
		alias: "/artworks/:artworkID",
	},
	{
		path: "/artist/:artistID",
		name: "ArtistDetail",
		component: ArtistDetail,
		alias: "/artists/:artistID",
	},
	{
		path: "/artists",
		name: "ArtistList",
		component: ArtistList,
		meta: {
			title: "View All Artists - York Graffiti Explorer",
		},
	},
	{
		path: "*",
		component: PageNotFound,
		meta: {
			title: "Page Not Found - York Graffiti Explorer",
		},
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
