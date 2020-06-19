const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e974809094a3d526de4d9165437fd391&query=${latitude},${longitude}&units=f`

  request({
    url,
    json: true
  }, (error, {
    body
  }) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, `
        Weather description: ${body.current.weather_descriptions[0]},
        Temperature: ${body.current.temperature},
        Feels like: ${body.current.feelslike}`)
    }
  })
}

module.exports = forecast