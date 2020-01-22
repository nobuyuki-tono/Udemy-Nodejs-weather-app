const request = require("request");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.API_KEY_GEOCODE}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
