const request = require('request')

const forcast = (longitude,latitude ,callback) =>{
    
     const url ='https://api.darksky.net/forecast/5c50d8cddc9ea1d1237b06abd7f396f9/' + latitude + ',' + longitude
     
     request({ url, json: true }, (error, {body}) => {
            if (error){
                callback('Unable to connect to weather API',undefined)
            }else if (body.error){
                callback('Unable to find location',undefined)
            }else{
                   let currentTemp= body.currently.temperature
                   let currentPerc= body.currently.precipProbability
                   let summary = body.daily.data[0].summary
                  
                  callback(undefined,summary +' It is currently '+currentTemp+' degrees out. There is a '+currentPerc+'% chance of rain.')
            }
      })

}

module.exports = forcast;