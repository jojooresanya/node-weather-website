const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const firstMessage = document.querySelector('#p1')
const secondMessage = document.querySelector('#p2')
const myLocationBtn = document.querySelector('#my-location')

weatherForm.addEventListener('submit', e => {
  e.preventDefault()
  const location = search.value

  firstMessage.textContent = 'Loading...'
  secondMessage.textContent = ''

  fetch(`/weather?address=${location}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        return firstMessage.textContent = data.error
      }

      firstMessage.textContent = data.location
      secondMessage.textContent = data.forecast
    })

  search.value = ''
})

myLocationBtn.addEventListener('click', () => {
  firstMessage.textContent = 'Loading...'

  if (!navigator.geolocation) {
    return firstMessage.textContent = 'Sorry, geolocation navigator is not supported for your browser'
  }

  navigator.geolocation.getCurrentPosition(async position => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const res = await fetch(`/weather/me?latitude=${latitude}&longitude=${longitude}`)
    const forecast = await res.json()

    if (forecast.error) {
      return firstMessage.textContent = forecast.error
    }

    firstMessage.textContent = forecast.forecast
  })
})