<template>
  <div>
    <!-- Error -->
    <ErrorMsg v-if="error" />

    <!-- Loading -->
    <div v-else class="">
      <div v-if="loading">
        <LoadingDetails />
      </div>

      <!-- Retrieve Successfull -->
      <div v-else>
        <h1 v-html="title" class="font-poppins font-semibold text-white text-2xl mb-3"></h1>
        <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-4">
          <div class="md:col-span-12 lg:col-start-1 lg:col-span-3">
            <div class="flex flex-col md:flex-row lg:flex-col font-ptserif">
              <img v-if="type" :src="thumb" :alt="title" class="w-3/5 mb-1 md:pr-4 lg:pr-0" />
              <div class="flex flex-col text-white w-full">
                <div class="my-2 md:mt-0 lg:mt-2">
                  <h1 class="-mb-1 text-xs font-poppins font-semibold">Author</h1>
                  <span v-html="author"></span>
                </div>
                <div class="my-2">
                  <h1 class="-mb-1 text-xs font-poppins font-semibold">Rating</h1>
                  <span v-html="status"></span>
                </div>
                <div class="my-2">
                  <a v-for="(items, index) in genre" :key="index">
                  <router-link :to="{ name: 'manga-catalog', query: { tag: items }}">
                    <button class="button py-1 px-2 m-1 text-xs rounded shadow-md rounded-md transform transition duration-300 east-in-out hover:-translate-y-1 hover:shadow-lg bg-gray-600 text-white">
                      {{ items }}
                    </button>
                  </router-link>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="my-2 md:my-0 lg:col-start-4 lg:col-span-12 text-white font-ptserif">
            <div class="my-3">
              <div v-if="type" class="flex text-xs font-poppins font-semibold">
                <h1>Synopsis</h1>
                <div @click="toggle" class="ml-1 cursor-pointer">
                    <span v-if="showSynopsis" class="px-1 font-normal">－</span>
                    <span v-else class="px-1 font-normal">＋</span>
                </div>
              </div>
              <p 
                v-html="description" 
                :class="showSynopsis ? 'block' : 'hidden'"></p>
            </div>

            <div v-if="chapter">
              <h1 class="text-xs font-poppins font-semibold mb-1">Chapter List</h1>
              <div class="ss-container w-full overflow-y-auto max-h-80 bg-secondary mb-3 p-3 rounded-sm">
                <ul>
                  <li v-for="(items, index) in chapter" :key="index">
                    <router-link
                      :to="{ name: 'series-chapter', params: { id: $route.params.id, chapter: items.no } }" exact
                      class="flex w-full py-1 px-2 rounded-sm hover:bg-purple">
                      Bab {{ items.no }} - {{ items.title }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>

            <div v-else v-for="(items, index) in assets" :key="index">
              <img :src="'/img/' + uri + '/' + items">
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Service from "@/services/services.js";

  export default {
    props: ["manga"],
    computed: {
      thumb() { return this.mangaDetails.data.thumb[0] },
      title() { return this.mangaDetails.data.titleJP },
      uri() { return this.mangaDetails.data.titleSafe },
      author() { return this.mangaDetails.data.author },
      status() { return this.mangaDetails.data.rating },
      description() { return this.mangaDetails.data.description },
      type() { return this.mangaDetails.data.series },
      genre() { return this.mangaDetails.data.tags },
      synopsis() { return this.mangaDetails.synopsis },
      chapter() { return this.mangaDetails.data.chapter },
      assets() { return this.mangaDetails.data.assets },
    },
    data() {
      return {
        mangaDetails: [],
        loading: true,
        error: false,
        showSynopsis: false,
      };
    },
    watch: {
      manga: {
        handler: 'fetchData',
        deep: true,
        immediate: true
      },
    },
    methods: {
      toggle() {
        this.showSynopsis = this.showSynopsis ? false : true;
      },
      async fetchData() {
        let manga = this.$route.params.id;
        this.loading = true;

        Service.getMangaDetails(manga)
          .then((response) => {
            const isSeries = response.data.data.series;
            if (isSeries) {
              this.$route.path.startsWith('/k/')
                ? this.mangaDetails = response.data
                : this.$router.push('/404');
            } else if (!isSeries) {
              this.$route.path.startsWith('/k/')
                ? this.$router.push('/404') 
                : this.mangaDetails = response.data
            }
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
