<template>
  <router-link
    :to=" type === true
      ? { name: 'series-details', params: { id } }
      : { name: 'manga-details', params: { id } }
    "
    class="w-full">
    <div
      class="flex flex-col md:flex-row h-full bg-secondary text-white hover:text-green shadow-md rounded-md transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg md:max-h-20 lg:max-h-20">
      <img
        :src="thumb"
        :alt="title"
        class="w-full h-20 rounded-t-md object-cover md:rounded-l-md md:rounded-t-none md:w-1/5 md:h-22 lg:h-20"/>
      <div class="absolute items-baseline l-0 m-2">
        <div
          class="font-nunito font-semibold text-xs bg-gray-300 rounded-full px-2">
        </div>
      </div>
      <div class="p-3 md:pt-2 md:px-3">
        <h1 v-html="title" class="font-ptserif text-md mb-1"></h1>
        <p v-html="author" class="font-poppins text-white text-xs"></p>
      </div>
    </div>
  </router-link>
</template>

<script>
  export default {
    props: {
      manga: Object,
    },
    computed: {
      id() { return this.manga.id },
      thumb() { return this.manga.data.thumb[0] },
      title() { return this.manga.data.titleJP },
      author() { return this.manga.data.author },
      type() { return this.manga.data.series },
      chapter() { return this.manga.data.chapter }
    },
  };
</script>
