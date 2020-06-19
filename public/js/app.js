const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const firstMessage = document.querySelector('#p1')
const secondMessage = document.querySelector('#p2')

weatherForm.addEventListener('submit', e => {
  e.preventDefault()
  const location = search.value

  firstMessage.textContent = 'Loading...'
  secondMessage.textContent = ''

  fetch(`http://localhost:3000/weather?address=${location}`)
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