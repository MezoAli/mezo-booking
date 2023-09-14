const NodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export default geocoder;
