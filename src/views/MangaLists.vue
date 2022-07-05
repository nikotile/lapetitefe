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
              v-for="(items, index) in series.slice(0, max)"
              :key="index"
              :manga="items"/>
          </div>
        </div>
        <div class="mb-5">
          <h2 class="text-white font-poppins font-semibold text-l mb-5">Doujin</h2>
          <div class="grid grid-cols-2 lg:grid-cols-2 gap-4">
            <MangaCard
              v-for="(items, index) in doujin.slice((max * page) - max, max * page)"
              :key="index"
              :manga="items"/>
          </div>
        </div>

        <div class="flex flex-col justify-center items-center mt-6">
          <div class="flex flex-row mx-auto px-2 font-poppins font-semibold text-white">
            <button
              @click="previousPage"
              :disabled="page <= 1"
              class="rounded-l-md px-3 transition duration-300 ease-in-out focus:outline-none"
              :class="[page <= 1 ? 'bg-gray-700' : 'bg-teriary hover:text-yellow hover:-translate-x-1']">
              <Icon name="arrow-left" />
            </button>
            <div class="text-center bg-main w-10 py-2 px-3 "> {{ page }} </div>
            <button
              @click="nextPage"
              :disabled="page === length"
              :class="[page === length ? 'bg-gray-700' : 'bg-teriary hover:text-yellow hover:translate-x-1']"
              class="bg-teriary rounded-r-md px-3 transition duration-300 ease-in-out focus:outline-none">
              <Icon name="arrow-right" />
            </button>
          </div>
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
      length() {
        // 'max' content per page
        const div = this.mangas.filter(manga => !manga.data.series).length / this.max;
        return Math.ceil(div);
      },
    },
    data() {
      return {
        mangas: [],
        page: 1,
        max: 6,
        loading: true,
        error: false,
      };
    },
    methods: {
      nextPage() {
        this.page += 1;
      },
      previousPage() {
        this.page -= 1;
      },
      async fetchData() {
        this.loading = true;

        Service.getMangas()
          .then((response) => {
            this.mangas = response.data;
          })
          .catch((error) => {
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
