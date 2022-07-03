<template>
  <nav class="bg-main md:px-3 md:flex md:flex-col md:flex-none md:justify-center md:items-center md:h-screen md:sticky md:top-0">
    <div>
      <ul>
        <div class="flex flex-row justify-around items-center md:grid md:grid-cols-1 md:gap-2 px-8 py-2 bg-teriary md:px-2 md:rounded-md">
          <router-link
            :to="{ name: 'manga-lists', params: { page: 1 } }" exact
            class="flex flex-col w-12 h-12 text-white justify-center items-center transition duration-300 ease-id-out rounded-md hover:bg-purple hover:text-white"
            :class="[routeName == 'manga-lists' ? 'bg-purple' : '']">
            <span>
              <Icon name="home" class="fill-current h-5 w-5 transition ease-in-out duration-200" />
            </span>
          </router-link>
          <router-link
            :to="{ name: 'manga-catalog' }" exact
            class="flex flex-col w-12 h-12 text-white justify-center items-center transition duration-300 ease-id-out rounded-md hover:bg-purple hover:text-white"
            :class="[routeName == 'manga-catalog' ? 'bg-purple' : '']">
            <span>
              <Icon name="book-open" class="fill-current h-5 w-5 transition ease-in-out duration-200" />
            </span>
          </router-link>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    computed: {
      routeName() { return this.$route.name },
    },
  }
</script>
