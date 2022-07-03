<template>
  <div>
    <h1 class="text-white font-poppins font-semibold text-xl mb-5">
      Katalog 
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
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
          <div v-for="entry in filteredEntries" class="flex flex-col md:flex-row h-full max-h-50 bg-secondary">
            <div class="p-3 md:pt-2 md:px-3">
              <router-link
                :to=" entry.data.series === true
                  ? { name: 'series-details', params: { id: entry.id } }
                  : { name: 'manga-details', params: { id: entry.id } }
                "
              class="w-full">
                <h1 v-html="entry.data.titleJP" class="font-ptserif text-md mb-1 text-white hover:text-yellow shadow-md rounded-md transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"></h1>
              </router-link>
        <a v-for="tag in entry.data.tags">
          <button @click="filterEntries(tag)" class="button py-1 px-2 m-1 text-xs rounded shadow-md rounded-md transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg" :class=" filteredTags.includes(tag) ? 'bg-yellow text-black' : 'bg-gray-600 text-white' ">
            {{ tag }}
          </button>
        </a>
      </div>
    </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MangaAltCard from "@/components/MangaAltCard.vue";
  import Service from "@/services/services.js";

  export default {
    data() {
      return {
        entries: [],
        filteredTags: [],
        filteredEntries: this.entries,
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
      entries() {
        this.filterEntries(undefined)
      }
    },
    methods: {
      async fetchData() {
        let popularity = this.popularity;
        let page = this.page;
        this.loading = true;

        Service.getMangas()
          .then((response) => {
            this.entries = response.data;
          })
          .catch((error) => {
            this.error = true;
          })
          .finally(() => (this.loading = false));
      },
      filterEntries(input) {
        // removes the null tag coming from watch
        const tags = this.filteredTags.filter(tag => tag !== null)
        if (tags.includes(input)) {
          const newTags = tags.filter(tag => tag != input)
          this.filteredTags = newTags
        } else {
          tags.push(input)
          this.filteredTags = tags
        }
        // kms lmao
        const search = (items, constraints) => {
          return items.filter(item =>
            constraints.every(constraint =>
              item.data.tags.some(obj => obj === constraint)
            )
          )
        }
        this.filteredEntries = search(this.entries, this.filteredTags)
      }
    },
    mounted() {
      this.fetchData();
      // when redirected from K to Catalog, pass the query as tag(s)
      if (this.$route.query.tag) {
        this.filterEntries(this.$route.query.tag)
      }
      // force language
      this.lang === '' ? this.lang = 'jp' : this.lang = 'id'
    },
    updated() {
      // if the entries doesn't load for some reason
      if (this.filteredEntries.length === 0) this.filteredEntries = this.entries
      // language
      this.$cookies.get('lang') === 'jp' ? this.lang = 'jp' : this.lang = 'id'
    }
  };
</script>
