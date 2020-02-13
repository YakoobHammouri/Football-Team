let listoption = document.getElementById('football');
let county = document.getElementById('Comptition');
let CompetitionsSeason = document.getElementById('Competitions-season');

const xhr = new XMLHttpRequest();
let apicall = (method, url, callback) => {
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      // the Json Pares move to Callback
      const response = xhr.responseText;
      if (callback) {
        callback(response);
      }
    }
  };
  xhr.open(method, url);
  xhr.send();
};

if (county !== null)
  county.addEventListener('change', e => {
    let countyVal = e.target.value;

    if (countyVal === '0') {
      CompetitionsSeason.classList.add('hide');
      alert('please choose the County');
      return;
    }
    CompetitionsSeason.classList.add('show');

    apicall('GET', `/leagues/${countyVal}`, res => {
      console.log(JSON.parse(res));
      let data = JSON.parse(res).api.leagues;
      console.log(data);
      createRowTabble(data);
    });
  });

if (CompetitionsSeason !== null)
  CompetitionsSeason.addEventListener('change', e => {
    let season = e.target.value;
    let countyVal = county.value;

    apicall('GET', `/leagues/${countyVal}/season/${season}`, res => {
      console.log(res);
      let data = JSON.parse(res).api.leagues;
      console.log(data);
      createRowTabble(data);
    });
  });

function createRowTabble(data) {
  if (data === undefined) return;
  if (!Array.isArray(data)) return;
  if (data.length == 0) return;

  const tbody = document.getElementById('tbcontant');
  tbody.innerHTML = null;
  data.forEach(league => {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.classList.add('col-40-1');

    const teamLink = document.createElement('a');

    teamLink.setAttribute('href', `/leagues/teams/${league.league_id}`);

    const span = document.createElement('span');
    span.innerText = league.name;

    const imgdiv = document.createElement('div');
    const img = document.createElement('img');
    img.src = league.logo;
    img.setAttribute('alt', league.name);

    imgdiv.appendChild(img);
    teamLink.appendChild(imgdiv);
    teamLink.appendChild(span);
    td1.appendChild(teamLink);

    const td2 = document.createElement('td');
    td2.classList.add('col-33');
    td2.classList.add('text-center');
    const span2 = document.createElement('span');
    span2.innerText = league.season_start + ' / ' + league.season_end;
    td2.appendChild(span2);

    tr.appendChild(td1);
    tr.appendChild(td2);

    tbody.appendChild(tr);
  });
}

function GetTeams() {
  let str = window.location.href;

  let leagId = str.slice(str.lastIndexOf('/') + 1);

  apicall('GET', `/leagues/get/teams/${leagId}`, res => {
    console.log(JSON.parse(res));
    let data = JSON.parse(res).api.teams;
    console.log(data);

    const tbody = document.getElementById('tbcontant');
    tbody.innerHTML = null;

    data.forEach(team => {
      const tr = document.createElement('tr');

      const td1 = document.createElement('td');
      td1.classList.add('col-40-1');
      const span = document.createElement('span');
      span.innerText = team.name;

      td1.appendChild(span);

      const img = document.createElement('img');
      img.src = team.logo;
      img.setAttribute('alt', 'logo');
      td1.appendChild(img);

      const td2 = document.createElement('td');
      td2.classList.add('col-33');
      const span2 = document.createElement('span');
      span2.innerText = team.venue_name;
      td2.appendChild(span2);

      const td3 = document.createElement('td');
      td2.classList.add('col-33');
      const span3 = document.createElement('span');
      span3.innerText = team.venue_city;
      td3.appendChild(span3);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);

      tbody.appendChild(tr);
    });
  });

  ///
}
