const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWF5dXNoc29vZCIsImEiOiJjbDEwYjRsOGUwZmoxM2NtdGNmaTR4MWQ3In0.ZP1IFymUiqHl8k6PWCJ3xg`;
  request({ url: url, json: true }, (error, response) => {
    // console.log("Message ", response.body.features[0]);
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      console.log("Returned a message ");
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
