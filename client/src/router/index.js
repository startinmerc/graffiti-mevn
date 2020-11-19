import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";
import About from "../views/About.vue";
import FullMap from "../views/FullMap.vue";
import ArtworkDetail from "../views/ArtworkDetail.vue";
import ArtistDetail from "../views/ArtistDetail.vue";
import ArtistList from "../views/ArtistList.vue";
import SubmitArtwork from "../views/SubmitArtwork.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Homepage",
		component: Homepage,
	},
	{
		path: "/about",
		name: "About",
		component: About,
	},
	{
		path: "/map",
		name: "FullMap",
		component: FullMap,
	},
	{
		path: "/map/:artworkID",
		name: "ArtworkOnMap",
		component: FullMap,
	},
	{
		path: "/map/:artistID",
		name: "ArtistOnMap",
		component: FullMap,
	},
	{
		path: "/artwork/new",
		name: "SubmitArtwork",
		component: SubmitArtwork,
	},
	{
		path: "/artwork/:artworkID",
		name: "ArtworkDetail",
		component: ArtworkDetail,
	},
	{
		path: "/artist/:artistID",
		name: "ArtistDetail",
		component: ArtistDetail,
	},
	{
		path: "/artists",
		name: "ArtistList",
		component: ArtistList,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
