function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

function getbuilds(flid) {
  let api = 'https://api.codetabs.com/v1/proxy?quest=https://androidfilehost.com/api/?action=folder&flid=' + flid;
  let request = new XMLHttpRequest();
  request.open('GET', api);
  request.onload = function(){
    let file = JSON.parse(request.responseText);
      for(i = file.DATA.files.length - 1; i >= 0; i--){
        let afh = file.DATA.files[i];
        let afh_date = convertdate(afh.upload_date);
        let afh_size = (afh.file_size / 1048576).toFixed(0) + " MB";
        tbody_base = document.getElementById("tbody01");
        globalapprends(afh.name, afh.url, afh_date, afh_size);
        collapsible();
        };
      };
  request.send();
};

function getroms(){
  myroms = ["tbody-havoc_mod|havoc-mod|land", "tbody-yukakernel|yukakernel|Land", "tbody-pearlos|team-nad|ROMS/land/PearlOS", "tbody-aosip|team-nad|ROMS/land/AOSiP", "tbody-derpfest|team-nad|ROMS/land/AOSiP-Derpfest"]
  for (x = 0; x < myroms.length; x++) {
    let tbody = myroms[x].split("|")[0];
    fetch('https://api.codetabs.com/v1/proxy?quest=https://sourceforge.net/projects/' + myroms[x].split("|")[1] + '/rss?path=/' + myroms[x].split("|")[2])
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        const items = data.querySelectorAll("item");
        items.forEach(el => {
          tbody_base = document.getElementById(tbody);
          globalapprends(el.querySelector("title").innerHTML, el.querySelector("link").innerHTML, el.querySelector("pubDate").innerHTML, (parseInt(el.innerHTML.split('filesize="')[1].split('">')[0]) / 1048576).toFixed(0) + "MB");
          collapsible();
        });
      });
  }
};

function getgameserver(){

};

function globalapprends(name, url, date, size){
  trbase = document.createElement("tr");
  tbody_base.appendChild(trbase);
  td01 = document.createElement("td");
  trbase.appendChild(td01);
  a01 = document.createElement("a");
  a01.innerHTML = name.split("<![CDATA[")[1].split("/").reverse()[0].split("]]>")[0];
  a01.setAttribute("href", url);
  td01.appendChild(a01);
  td02 = document.createElement("td");
  td02.innerHTML = date;
  trbase.appendChild(td02);
  td03 = document.createElement("td");
  td03.innerHTML = size;
  trbase.appendChild(td03);
};

function convertdate(date){
  let c_date = new Date(date * 1000);
  c_date.toLocaleString();
  return moment(c_date).format("DD/MM/YYYY");
};

function collapsible(){
  let elems = document.querySelectorAll('.collapsible');
  let instances = M.Collapsible.init(elems, Option);
};

function nComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function terraria_server() {
  let api = 'https://raw.githubusercontent.com/AyraHikari/MyOTA/master/api';
  let request = new XMLHttpRequest();
  request.open('GET', api);
  request.onload = function() {
    let server_api = request.responseText;
    if (server_api != "offline") {
      fetch('https://api.codetabs.com/v1/proxy?quest=http://' + server_api + '/v2/server/status')
        .then(async(response) => {
          if (response.status == 200) {
            const api_resp = await response.json()
            document.getElementById("tbody-terraria-status").innerHTML = `Online`;
            document.getElementById("tbody-terraria-status").style = `color:green;`;
            document.getElementById("tbody-terraria-world").innerHTML = api_resp.world;
            document.getElementById("tbody-terraria-address").innerHTML = server_api.split(":")[0] + ":" + api_resp.port;
            document.getElementById("tbody-terraria-players").innerHTML = api_resp.playercount + "/" + api_resp.maxplayers;
            if (api_resp.serverpassword == false) {
              document.getElementById("tbody-terraria-passwd").innerHTML = "No password needed";
            } else {
              document.getElementById("tbody-terraria-passwd").innerHTML = "Password needed!";
            }
            document.getElementById("tbody-terraria-ver").innerHTML = api_resp.serverversion;
            document.getElementById("tbody-terraria-ver").innerHTML = api_resp.serverversion;
            document.getElementById("tbody-terraria-uptime").innerHTML = api_resp.uptime;
          }
      })
    }
  }
  request.send();
};

function covid() {
  let api = 'https://api.codetabs.com/v1/proxy?quest=https://bing.com/covid';
  let request = new XMLHttpRequest();
  request.open('GET', api);
  request.onload = function() {
    let api_ig = request.responseText.split('var ig="')[1].split('", ')[0];
    if (api_ig) {
      fetch('https://api.codetabs.com/v1/proxy?quest=https://bing.com/covid/data?IG=' + api_ig)
        .then(async(response) => {
          if (response.status == 200) {
            const api_resp = await response.json()
            totalConfirmed = 0;
            totalDeaths = 0;
            totalRecovered = 0;
            for (x = 0; x < api_resp.areas.length; x++) {
              totalConfirmed += api_resp.areas[x].totalConfirmed;
              totalDeaths += api_resp.areas[x].totalDeaths;
              totalRecovered += api_resp.areas[x].totalRecovered;
              if (api_resp.areas[x].id == "indonesia") {
                ID_totalConfirmed = api_resp.areas[x].totalConfirmed;
                ID_totalDeaths = api_resp.areas[x].totalDeaths;
                ID_totalRecovered = api_resp.areas[x].totalRecovered;
              }
            }

            document.getElementById("g-totalConfirmed").innerHTML = "<b>" + nComma(totalConfirmed) + "</b> Active cases";
            document.getElementById("g-totalDeaths").innerHTML = "<b>" + nComma(totalDeaths) + "</b> Death cases";
            document.getElementById("g-totalRecovered").innerHTML = "<b>" + nComma(totalRecovered) + "</b> Recovered cases";
 
            document.getElementById("i-totalConfirmed").innerHTML = "<b>" + nComma(ID_totalConfirmed) + "</b> Active cases";
            document.getElementById("i-totalDeaths").innerHTML = "<b>" + nComma(ID_totalDeaths) + "</b> Death cases";
            document.getElementById("i-totalRecovered").innerHTML = "<b>" + nComma(ID_totalRecovered) + "</b> Recovered cases";
          }
      })
    }
  }
  request.send();
}