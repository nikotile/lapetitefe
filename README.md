# La Petite FE

A substitute for [La Petite Manga](https://manga.lapetite.moe)'s old frontend. While actually doesn't offer massive differences, this one still retains the all-time fan favorite feature: **tag filtering**.

Note that me can't into code and this is still on active development, so you might find problems.

## Build Setup

This will use the public development endpoints (e.g. https://api.lapetite.moe/dev/manga/api/entries), which will be proxied in `vite.config.js`.

``` bash
# install dependencies
npm i

# vite / serve with hot reload at localhost:42069
npm run dev

# vite build / build for production
npm run build
```

## Analytics
Uses a self-hosted Umami instance. See Umami's [FAQ](https://umami.is/docs/faq). Specific event trackers for social links are in `src/components/SideContent.vue`

## To-do

- [x] Make it work
- [x] Pagination in the main page
- [ ] Cookies-based theme/user preference(s)
- [ ] Make it less idiotic

## License
GNU GPL v3.0 or later

La Petite FE is derived from [kurnyaannn](https://github.com/kurnyaannn)'s [MangaVUE](https://github.com/kurnyaannn/mangavue). For complete copyright notices, see [COPYRIGHT.md](COPYRIGHT.md)
