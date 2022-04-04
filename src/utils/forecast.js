const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b0f8060af9ceedebb9caaf11997cdc10&query=${longitude},${latitude}&units=f`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      //   console.log("Unable to connect to the weather service");
      callback("Unable to connect to the weather service", undefined);
    } else if (response.body.error) {
      //   console.log(response.body.error.info);
      const { info } = response.body.error;
      callback(info, undefined);
    } else {
      //   console.log(
      //     response.body.current.weather_descriptions[0] +
      //       ". The current temperature is " +
      //       response.body.current.temperature +
      //       " degree farenheit and it feels like " +
      //       response.body.current.feelslike +
      //       " degree farenheit"
      //   );

      const { weather_descriptions, temperature, feelslike } =
        response.body.current;

      callback(undefined, {
        weatherDescription: weather_descriptions[0],
        temperature,
        feelslike,
      });
    }

    // console.log(response.body);
    // console.log();
  });
};

module.exports = forecast;
