/* eslint-env worker */

const mockCache = 'mock-cache-v1'

const resources = [
  '/',
  '/main.js'
]

const mocks = [
  {
    path: '/user',
    data: {
      type: 'user',
      name: 'Mocker'
    }
  }, {
    path: '/book',
    data: {
      type: 'book',
      title: 'Mocking Worker'
    }
  }
]

const createMockResponse = data => {
  return new Response(JSON.stringify(data))
}

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(mockCache)
      .then(cache => {
        console.log(`Registering /user`)
        return Promise.all([
          cache.addAll(resources),
          ...mocks.map(mock => cache.put(mock.path, createMockResponse(mock.data)))
        ])
      })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response
        }
        console.log(`SM received request it couldn't handle`, event.request)
      }
    )
  )
})
