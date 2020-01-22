const request = require("request");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const forecast = (latitude, longtitude, callback) => {
  const url = `https://api.darksky.net/forecast/${process.env.API_KEY_FORECAST}/${latitude},${longtitude}?units=si`;

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
