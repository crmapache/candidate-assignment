import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher, prefetch } from '@layer0/prefetch/sw'
import DeepFetchPlugin, { DeepFetchCallbackParam } from '@layer0/prefetch/sw/DeepFetchPlugin'

skipWaiting()
clientsClaim()

// Prefetching for the PDP pages of "bath-bombs" category
prefetch('/bath/bath-bombs/:path*')

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      {
        selector: '.component-image.position-absolute.promotion-impression-img',
        maxMatches: 1,
        attribute: 'src',
        as: 'image',
        callback: deepFetchImages,
      },
      {
        selector: '.plp-banner-top-inner img.plp-banner-top-image',
        maxMatches: 1,
        attribute: 'src',
        as: 'image',
        callback: deepFetchImages,
      },
      {
        selector: 'img.product-tile-image.position-relative',
        maxMatches: 2,
        attribute: 'src',
        as: 'image',
        callback: deepFetchImages,
      },
      // Deep fetching for the main images for the PDP page of "bath-bombs" category.
      {
        selector: 'img.pdp-carousel-image',
        maxMatches: 3,
        attribute: 'src',
        as: 'image',
        callback: deepFetchImages,
      },
    ]),
  ],
})
  .route()

// I created one function for all images because old functions was the same except logs.
function deepFetchImages({ $el, el }: DeepFetchCallbackParam) {
  prefetch($el.attr('src'), 'image')
}
