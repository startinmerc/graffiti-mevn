import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";
import About from "../views/About.vue";
import FullMap from "../views/FullMap.vue";
import ArtworkDetail from "../views/ArtworkDetail.vue";
import ArtistDetail from "../views/ArtistDetail.vue";
import ArtistList from "../views/ArtistList.vue";

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
		path: "/map/:id",
		component: FullMap,
		props: true,
	},
	{
		path: "/artwork/:id",
		name: "ArtworkDetail",
		component: ArtworkDetail,
	},
	{
		path: "/artist/:id",
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
