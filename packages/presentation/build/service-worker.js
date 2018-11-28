'use strict'
var precacheConfig = [
    ['/index.html', '396ca168cf4534196fad3858fb3b0d96'],
    ['/static/js/main.37059192.js', '3d17f862819266d4ae854bdb5218f169'],
    ['/static/media/add-agent.0cb35163.scss', '0cb35163d79f35b64e2be023acc720be'],
    ['/static/media/agent-detail.2992bf64.scss', '2992bf64f62c5f3e4de9d6dc6926f96f'],
    ['/static/media/agent-listing.b6227104.scss', 'b622710478398c51a06b2336cc3f4683'],
    ['/static/media/agent-preview.74e92de7.scss', '74e92de7425a2820c5f9e94327be5112'],
    ['/static/media/app.5c5c2670.scss', '5c5c2670dc3d5987e698f10f4c0da396'],
    ['/static/media/borderbox.8e0c2fe5.scss', '8e0c2fe56fc154f4ddb432fcdb8a27e8'],
    ['/static/media/mentorship-detail.d41d8cd9.scss', 'd41d8cd98f00b204e9800998ecf8427e'],
    ['/static/media/normalize.749a8a06.scss', '749a8a0628e2fdf50c560b2759883bdf'],
    ['/static/media/team-listing.1599b1f1.scss', '1599b1f175b6bcb0ff17d65813dac06a'],
  ],
  cacheName =
    'sw-precache-v3-sw-precache-webpack-plugin-' +
    (self.registration ? self.registration.scope : ''),
  ignoreUrlParametersMatching = [/^utm_/],
  addDirectoryIndex = function(e, t) {
    var n = new URL(e)
    return '/' === n.pathname.slice(-1) && (n.pathname += t), n.toString()
  },
  cleanResponse = function(t) {
    return t.redirected
      ? ('body' in t ? Promise.resolve(t.body) : t.blob()).then(function(e) {
          return new Response(e, { headers: t.headers, status: t.status, statusText: t.statusText })
        })
      : Promise.resolve(t)
  },
  createCacheKey = function(e, t, n, r) {
    var a = new URL(e)
    return (
      (r && a.pathname.match(r)) ||
        (a.search += (a.search ? '&' : '') + encodeURIComponent(t) + '=' + encodeURIComponent(n)),
      a.toString()
    )
  },
  isPathWhitelisted = function(e, t) {
    if (0 === e.length) return !0
    var n = new URL(t).pathname
    return e.some(function(e) {
      return n.match(e)
    })
  },
  stripIgnoredUrlParameters = function(e, n) {
    var t = new URL(e)
    return (
      (t.hash = ''),
      (t.search = t.search
        .slice(1)
        .split('&')
        .map(function(e) {
          return e.split('=')
        })
        .filter(function(t) {
          return n.every(function(e) {
            return !e.test(t[0])
          })
        })
        .map(function(e) {
          return e.join('=')
        })
        .join('&')),
      t.toString()
    )
  },
  hashParamName = '_sw-precache',
  urlsToCacheKeys = new Map(
    precacheConfig.map(function(e) {
      var t = e[0],
        n = e[1],
        r = new URL(t, self.location),
        a = createCacheKey(r, hashParamName, n, /\.\w{8}\./)
      return [r.toString(), a]
    }),
  )
function setOfCachedUrls(e) {
  return e
    .keys()
    .then(function(e) {
      return e.map(function(e) {
        return e.url
      })
    })
    .then(function(e) {
      return new Set(e)
    })
}
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(function(r) {
        return setOfCachedUrls(r).then(function(n) {
          return Promise.all(
            Array.from(urlsToCacheKeys.values()).map(function(t) {
              if (!n.has(t)) {
                var e = new Request(t, { credentials: 'same-origin' })
                return fetch(e).then(function(e) {
                  if (!e.ok)
                    throw new Error(
                      'Request for ' + t + ' returned a response with status ' + e.status,
                    )
                  return cleanResponse(e).then(function(e) {
                    return r.put(t, e)
                  })
                })
              }
            }),
          )
        })
      })
      .then(function() {
        return self.skipWaiting()
      }),
  )
}),
  self.addEventListener('activate', function(e) {
    var n = new Set(urlsToCacheKeys.values())
    e.waitUntil(
      caches
        .open(cacheName)
        .then(function(t) {
          return t.keys().then(function(e) {
            return Promise.all(
              e.map(function(e) {
                if (!n.has(e.url)) return t.delete(e)
              }),
            )
          })
        })
        .then(function() {
          return self.clients.claim()
        }),
    )
  }),
  self.addEventListener('fetch', function(t) {
    if ('GET' === t.request.method) {
      var e,
        n = stripIgnoredUrlParameters(t.request.url, ignoreUrlParametersMatching),
        r = 'index.html'
      ;(e = urlsToCacheKeys.has(n)) || ((n = addDirectoryIndex(n, r)), (e = urlsToCacheKeys.has(n)))
      var a = '/index.html'
      !e &&
        'navigate' === t.request.mode &&
        isPathWhitelisted(['^(?!\\/__).*'], t.request.url) &&
        ((n = new URL(a, self.location).toString()), (e = urlsToCacheKeys.has(n))),
        e &&
          t.respondWith(
            caches
              .open(cacheName)
              .then(function(e) {
                return e.match(urlsToCacheKeys.get(n)).then(function(e) {
                  if (e) return e
                  throw Error('The cached response that was expected is missing.')
                })
              })
              .catch(function(e) {
                return (
                  console.warn(
                    'Couldn\'t serve response for "%s" from cache: %O',
                    t.request.url,
                    e,
                  ),
                  fetch(t.request)
                )
              }),
          )
    }
  })
