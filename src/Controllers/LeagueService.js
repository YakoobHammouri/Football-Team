const leagueOfCuntry = (error, response, body) => {
  console.log('in callback');
  if (error) {
    console.log(error);
    return;
  }

  if (!error && response.statusCode == 200) {
    const info = JSON.parse(body);
    console.log(info);
    return info;
  } else console.log('Error  ,  status ', response.statusCode);
};

module.exports = leagueOfCuntry;
