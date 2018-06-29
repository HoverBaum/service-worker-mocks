const fetchUserButton = document.querySelector('#fetchUser')
const fetchBookButton = document.querySelector('#fetchBook')

const resultDiv = document.querySelector('#dataOutput')

const fetchResource = path => {
  console.log('fetching...')
  window.fetch(path)
    .then(response => {
      if (!response.ok) {
        resultDiv.innerHTML = 'Failed'
        console.log(response)
        return
      }
      return response.json()
    })
    .then(data => {
      resultDiv.innerHTML = JSON.stringify(data, null, 2)
    })
}

fetchUserButton.addEventListener('click', () => fetchResource('/user'))
fetchBookButton.addEventListener('click', () => fetchResource('/book'))

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope)
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err)
    })
  })
}
