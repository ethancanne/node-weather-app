const request = require('postman-request');


const geocode = (address, callback)=>{

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZW1hbmU3OCIsImEiOiJja2kwYzczZjMxY2J1MnF0aG9leXZ6aTByIn0.gxVADyMWRqgTQSW_WLnCbA&limit=1`

    request({ url, json: true }, (error, {body}={})=>{
        if (error){
            callback("Cannot satisfy the location request: unable to connect to the location service.", undefined)
        }else if (body.features.length === 0||!(body.features)){
            callback("Cannot satisfy the location request: unable to find the provided location.", undefined)
        }else{
            const {center, place_name} = body.features[0]
            const latitude = center[1]
            const longitude = center[0]

            callback(undefined, {
                latitude,
                longitude,
                place_name
            })
        }
       
    })
}

module.exports = geocode

