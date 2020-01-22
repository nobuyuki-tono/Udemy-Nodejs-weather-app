const request = require("request");
const config = require("config");

const apiKey1 = config.get("apiKeyForecast");

const forecast = (latitude, longtitude, callback) => {
  const url = `https://api.darksky.net/forecast/${apiKey1}/${latitude},${longtitude}?units=si`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect");
    } else if (body.error) {
      callback("Unable to find a weather data!!!Try another location");
    } else {
      callback(
        undefined,
        `${body.currently.summary}.It is currently ${body.currently.temperature} degree out. There is a ${body.currently.precipProbability}% chance of rain.`
      );
    }
  });
};
module.exports = forecast;
