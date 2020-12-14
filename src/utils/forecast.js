const request = require('postman-request');

const forecast = (latitude, longitude, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=faae1b9ae7edf0b10a252aef41a1a20e&query=${latitude + "," + longitude}&units=f`

        request({ url, json: true }, (error, {body}={})=>{
            if (error){
                callback("Cannot satisfy the weather request: unable to connect to the weather service.")
            }else if(body.error){
                callback("Cannot satisfy the weather request: unable to find the provided location.")
            }else{
                const current = body.current;
                callback(undefined, `It is currently ${current.temperature} degrees outside, but it feels like ${current.feelslike} degrees, with ${current.weather_descriptions[0]}. Wind gusts are up to ${current.wind_speed}mph.`)
            }
        })
}

module.exports = forecast
