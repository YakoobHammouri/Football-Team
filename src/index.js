const express = require('express');
const path = require('path');
const apiCall = require('./Controllers/RequestService');
const leg = require('./Controllers/LeagueService');
const errorHandler = require('./Controllers/ErrorHandler');
const app = express();

app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');
app.use(
  express.static(path.join(__dirname, '..', 'public'), { maxAge: '30d' })
);

app.get('/leagues/:country', (req, res) => {
  apiCall(
    `https://api-football-v1.p.rapidapi.com/v2/leagues/type/league/${req.params.country}/2018`,
    (err, resp, body) => res.send(leg(err, resp, body))
  );
});

app.get('/leagues/:country/season/:season', (req, res) => {
  apiCall(
    `https://api-football-v1.p.rapidapi.com/v2/leagues/type/league/${req.params.country}/${req.params.season}`,
    (a, b, c) => res.send(leg(a, b, c))
  );
});

app.get('/leagues/teams/:leagueId', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'leages-teams.html'));
});

app.get('/leagues/get/teams/:leagueId', (req, res) => {
  apiCall(
    `https://api-football-v1.p.rapidapi.com/v2/teams/league/${req.params.leagueId}`,
    (a, b, c) => res.send(leg(a, b, c))
  );
});

app.use(errorHandler.error404);
app.use(errorHandler.error500);

app.listen(app.get('port'), () =>
  console.log(`the Server in running ${app.get('port')}`)
);
