<template>
  <div>
    <!-- Error -->
    <ErrorMsg v-if="error" />

    <!-- Loading -->
    <div v-else>
      <div v-if="loading">
        <LoadingChapter />
      </div>

      <!-- Retrieve Successfull -->
      <div v-else>
        <h1 v-html="chapterTitle" class="mb-5 text-white font-poppins font-semibold text-xl capitalize"></h1>
        <div v-for="(items, index) in chapterImageList" :key="index">
          <img :src="'/img/' + uri + '/' + this.$route.params.chapter + '/' + items">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LoadingCard from "@/components/LoadingCard.vue";
  import Service from "@/services/services.js";

  export default {
    components: {
      LoadingCard,
    },
    computed: {
      uri() { return this.mangaDetails.data.titleSafe },
      chapterTitle() { return this.mangaDetails.data.chapter[this.$route.params.chapter-1].title },
      chapterImageList() { return this.mangaDetails.data.assets },
    },
    data() {
      return {
        mangaDetails: [],
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
      async fetchData() {
        let id = this.$route.params.id;
        let chapter = this.$route.params.chapter;

        Service.getMangaChapter(id, chapter)
          .then((response) => {
            this.mangaDetails = response.data;
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
