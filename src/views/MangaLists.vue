<template>
  <div>
    <h1 class="text-white font-poppins font-semibold text-xl mb-5">
      Beranda
    </h1>
    <!-- Error -->
    <ErrorMsg v-if="error" />

    <!-- Loading -->
    <div v-else>
      <div v-if="loading">
        <LoadingCard />
      </div>

      <!-- Retrieve Successfull -->
      <div v-else>
        <div class="mb-5">
          <h2 class="text-white font-poppins font-semibold text-l mb-5">Series</h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MangaCard
              v-for="(items, index) in series.slice(0, 6)"
              :key="index"
              :manga="items"/>
          </div>
        </div>
        <div class="mb-5">
          <h2 class="text-white font-poppins font-semibold text-l mb-5">Doujin</h2>
          <div class="grid grid-cols-2 lg:grid-cols-2 gap-4">
            <MangaCard
              v-for="(items, index) in doujin.slice(0, 6)"
              :key="index"
              :manga="items"/>
          </div>
        </div>
        <div class="flex flex-row justify-center">
          <router-link :to="{ name: 'manga-catalog' }">
            <button class="button py-1 px-2 text-white rounded shadow-md rounded-md transform transition duration-300 ease-in-out hover:translate-x-1 hover:shadow-lg bg-gray-600 hover:text-green">Katalog ➙</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LoadingCard from "@/components/LoadingCard.vue";
  import MangaCard from "@/components/MangaCard.vue";
  import Service from "@/services/services.js";

  export default {
    components: {
      LoadingCard,
      MangaCard,
    },
    computed: {
      series() { return this.mangas.filter(manga => manga.data.series) },
      doujin() { return this.mangas.filter(manga => !manga.data.series) },
    },
    data() {
      return {
        mangas: [],
        page: 1,
        loading: true,
        error: false,
      };
    },
    watch: {
      page: {
        handler: 'fetchData',
        deep: true,
        immediate: true
      },
    },
    methods: {
      nextPage() {
        this.page += 1;
      },
      previousPage() {
        this.page -= 1;
      },
      async fetchData() {
        let page = this.page;
        this.loading = true;

        Service.getMangas()
          .then((response) => {
            this.mangas = response.data;
          })
          .catch((error) => {
            console.log("sorry there was an error " + error);
            this.error = true;
          })
          .finally(() => (this.loading = false));
        }
    },
    mounted() {
      this.fetchData();
    },
  };
</script>
