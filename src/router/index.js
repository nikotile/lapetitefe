import { createRouter, createWebHistory } from 'vue-router'
import MangaDetails from "../views/MangaDetails.vue";
import MangaChapter from "../views/MangaChapter.vue";
import MangaLists from "../views/MangaLists.vue";
import MangaCatalog from "../views/MangaCatalog.vue";
import MangaSearch from "../views/MangaSearch.vue";

const routes = [
  {
    path: "/",
    name: "manga-lists",
    component: MangaLists,
    props: true,
  },
  {
    path: "/catalog",
    name: "manga-catalog",
    component: MangaCatalog,
  },
  {
    path: "/h/:id",
    name: "manga-details",
    component: MangaDetails,
    props: true,
  },
  {
    path: "/k/:id",
    name: "series-details",
    component: MangaDetails,
    props: true,
  },
  {
    path: "/k/:id/:chapter",
    name: "series-chapter",
    component: MangaChapter,
    props: true,
  },
  {
    path: "/search/:query",
    name: "manga-search",
    component: MangaSearch,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
