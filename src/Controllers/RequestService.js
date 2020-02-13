const request = require('request');

const apiCall = (remotUrl, callback) => {
  const options = {
    url: remotUrl,
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': `${process.env.Api_Key}`
    }
  };
  request(options, callback);
};

module.exports = apiCall;
