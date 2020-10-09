const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b70a88f5c36b9f9d80cb795a36cc369f&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + ''

    request({ url:url, json: true}, (error, response) => {
        if (error) {
           callback('failed connect to the service!', undefined) 
        } else if (response.body.error) {
            callback('cant able to acces the coordinate', undefined)
        } else {
            callback(undefined, 'the weather is ' +response.body.current.weather_descriptions + ', it is ' +response.body.current.temperature+ ' degree out and it feels like ' +response.body.current.feelslike+' degree out there'
            )
        }
    })




}


module.exports = forecast