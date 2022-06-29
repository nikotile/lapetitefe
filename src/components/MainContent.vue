<template>
	<div class="flex flex-col px-5 md:pl-0 md:pb-6 md:pr-6">
		<div class="md:block flex items-center sticky top-0 z-50 bg-main py-6">
      <router-link :to="{ name: 'manga-lists' }">
        <a>
          <span class="font-cinzel sm:text-3xl font-bold text-white">✨ La Petite Manga</span>
        </a>
      </router-link>
    </div>
    <router-view
      class="mb-24 mt-2 md:mb-2 md:mt-12"
      :key="$route.fullPath" />
	</div>
</template>

<script>
	export default {};
</script>
