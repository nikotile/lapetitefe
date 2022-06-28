<template>
    <div
      class="flex flex-col md:flex-row h-full max-h-50 bg-secondary">
      <div class="p-3 md:pt-2 md:px-3">
        <router-link
          :to="{ name: 'manga-details', params: { id } }" exact
          class="w-full">
          <h1 v-html="title" class="font-ptserif text-md mb-1 text-white hover:text-green shadow-md rounded-md transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"></h1>
        </router-link>
        <a class="m-1" v-for="tag in tags">
          <button class="button py-1 px-2 text-xs rounded bg-gray-400 shadow-md rounded-md transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
            {{ tag }}
          </button>
        </a>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      manga: Object,
    },
    computed: {
      id() { return this.manga.id },
      tags() { return this.manga.data.tags },
      title() { return this.manga.data.titleJP },
    },
  };
</script>
