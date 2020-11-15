import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";
import About from "../views/About.vue";
import FullMap from "../views/FullMap.vue";
import ArtworkDetail from "../views/ArtworkDetail.vue";

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
		path: "/artwork/:id",
		name: "ArtworkDetail",
		component: ArtworkDetail
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
