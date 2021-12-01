import { Router } from '@layer0/core/router'
import { starterRoutes } from '@layer0/starter'
import { CACHE_ASSETS, CACHE_PAGES } from './cache'
import shoppingFlowRouteHandler from './shoppingFlowRouteHandler'

export default new Router()
  .use(starterRoutes)
  .match('/', shoppingFlowRouteHandler)
  .match('/home', shoppingFlowRouteHandler)
  .match('/new/:path*', shoppingFlowRouteHandler)

  // Caching for the PDP pages of "bath-bombs" category
  .match('/bath/bath-bombs/:path*', shoppingFlowRouteHandler)

  // Caching for all static images served from the /dw/image/v2 path.
  .match('/dw/image/v2/:path*', ({ cache, proxy }) => {
    cache(CACHE_ASSETS)
    return proxy('origin')
  })

  .match('/on/demandware.static/Sites-Lush-Site/:path*', ({ cache, proxy }) => {
    cache(CACHE_ASSETS)
    return proxy('origin')
  })

  .match('/service-worker.js', ({ serviceWorker }) => serviceWorker('dist/service-worker.js'))

  .match('/main.js', ({ serveStatic, cache }) => {
    cache(CACHE_ASSETS)
    return serveStatic('dist/browser.js')
  })

  .fallback(({ proxy }) => {
    proxy('origin')
  })
