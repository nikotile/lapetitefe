<template>
  <aside class="bg-secondary h-full pb-24 px-5 lg:px-7">
    <div class="relative text-gray-600 pt-20 pb-6 lg:pt-6 sticky top-0 z-50 bg-secondary">
      <div
        class="flex justify-start items-center lg:hidden"
        :class="[query ? 'block' : 'hidden']">
        <h1 class="absolute text-white font-poppins font-semibold top-0 mt-7"> > Search results</h1>  
      </div>
      <input
        class="bg-teriary font-poppins text-white w-full h-10 pl-4 pr-12 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-yellow transition ease-in-out duration-300"
        autocomplete="off"
        name="search"
        v-model.trim="query"
        @keyup="searchManga"
        @focus="focus = true"
        @blur="focus = false"
        placeholder="Search..." />
      <button type="submit" class="absolute right-0 top-0 mt-20 pt-3 lg:pt-0 lg:mt-9 mr-4">
        <svg
          class="h-4 w-4 fill-current transition ease-in-out duration-300"
          :class="[focus ? 'text-green' : 'text-white']"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
          viewBox="0 0 56.966 56.966" xml:space="preserve"
          style="enable-background: new 0 0 56.966 56.966" width="512px" height="512px">
          <path
            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
      <div
        class="absolute px-3 py-3 bg-teriary w-full text-white text-sm font-ptserif z-50 max-h-96 overflow-y-auto rounded-b-sm"
        :class="[query ? '' : 'hidden']">
        <ul>
          <li
            class="py-1 px-2 text-center"
            :class="[mangas ? 'hidden' : 'block']">
            Searching result for '{{ query }}'
          </li>
          <li v-if="query" v-for="(items, index) in mangas" :key="index" @click="clickResult">
            <router-link
              :to=" items.data.series
                ? { name: 'series-details', params: { id: items.id } }
                : { name: 'manga-details', params: { id: items.id } }
              "
              class="flex w-full py-1 px-2 rounded-sm hover:bg-purple">
              {{ items.data.titleJP }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="">
      <div class="mt-12 pb-4">
        <div class="flex flex-row justify-between text-center text-white">
          <a
            v-for="button in buttonBig"
            :key="button"
            :href="button.url"
            target="_blank"
            class="flex flex-row w-full bg-teriary justify-center items-center px-2 py-2 rounded-md font-cinzel font-bold transition ease-in-out duration-300 transform hover:-translate-y-1 hover:bg-purple">
            <Icon :name="button.icon"/>
            <span
              v-html="button.name"
              class="ml-3 font-cinzel font-bold text-md"
            ></span>
          </a>
        </div>
      </div>
      <div class="py-4 mb-3">
        <div class="flex flex-row justify-between text-white py-2 px-3">
          <a
            v-for="button in buttonSmall"
            :key="button"
            :href="button.url"
            target="_blank"
            class=" flex flex-col items-center justify-center w-8 h-8 bg-teriary rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-purple">
            <Icon :name="button.icon" />
          </a>
        </div>
      </div>
      <div class="flex flex-row justify-center text-white py-2 px-3">
        <router-link :to="{ name: 'about' }" @click="clickResult">
          <a class="underline hover:text-yellow">Informasi</a>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script>
  import Service from "@/services/services.js";
  export default {
    data() {
      return {
        mangas: [],
        genres: [],
        buttonSmall: [
          { icon: "rss", url: "/api/rss" },
          { icon: "globe", url: "https://lapetite.moe" },
          { icon: "edit", url: "https://papan.lapetite.moe" },
          { icon: "github", url: "https://github.com/nikotile/lapetitefe" },
          { icon: "twitter", url: "https://twitter.com/lapetitemoe" },
          { icon: "message-circle", url: "https://discord.gg/K9UWEgsCCY" },
        ],
        buttonBig: [
          {
            name: "Trakteer",
            icon: "heart",
            url: "https://trakteer.id/lapetitemanga",
          },
          {
            name: "Feedback",
            icon: "edit",
            url: "https://papan.lapetite.moe/ext4/thread/3.html",
          },
        ],
        query: "",
        focus: false,
        loading: true,
        error: false,
      };
    },
    watch: {
      search: {
        handler: 'searchManga',
        deep: true,
        immediate: true
      },
    },
    methods: {
      searchManga() {
        let query = this.query.replace(/\s/g, '').toLowerCase();
        Service.getMangaSearch(query)
          .then((response) => {
            this.mangas = response.data;
          })
          .catch((error) => {
            this.error = true;
          });
      },
      clickResult() {
        this.$emit('closeMenu');
        this.query = "";
      }
    },
    mounted() {
      this.searchManga();
    },
    created() {
      
    },
  };
</script>
