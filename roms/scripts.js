function getbuilds(flid) {
  let api = 'https://cors.io/?https://androidfilehost.com/api/?action=folder&flid=' + flid;
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
  let api = 'https://cors.io/?http://142.93.233.141:33507/api/getroms';
  let request = new XMLHttpRequest();
  request.open('GET', api);

  request.onload = function(){
    let file = JSON.parse(request.responseText);
    allrom = ["havoc_mod", "pearlos", "yukakernel"]
    for (x = 0; x < allrom.length; x++) {
      rom = allrom[x]
      if (rom == "havoc_mod") {
        jarak = file.roms.havoc_mod.length;
      } else if (rom == "pearlos") {
        jarak = file.roms.pearlos.length;
      } else if (rom == "yukakernel") {
        jarak = file.roms.yukakernel.length;
      }
      for (i = 0; i < jarak; i++) {
        let myapi = file.roms;
        if (rom == "havoc_mod") {
          myapi = myapi.havoc_mod[i];
          tbody_base = document.getElementById("tbody-havoc_mod");
        } else if (rom == "pearlos") {
          myapi = myapi.pearlos[i];
          tbody_base = document.getElementById("tbody-pearlos");
        } else if (rom == "yukakernel") {
          myapi = myapi.yukakernel[i];
          tbody_base = document.getElementById("tbody-yukakernel");
        }
        
        let my_date = convertdate(myapi.upload_date);
        let my_size = (myapi.file_size / 1048576).toFixed(0) + "MB";

        globalapprends(myapi.name, myapi.url, my_date, my_size);
        collapsible();
        };
      }
    }
    request.send();
};

function getgameserver(){
  let api = 'https://cors.io/?http://104.248.229.33:7800/v2/server/status';
  let request = new XMLHttpRequest();
  request.open('GET', api);

  request.onload = function(){
    let myapi = JSON.parse(request.responseText);
    status = myapi.status;
    nameworld = myapi.world;
    serverport = myapi.port;
    players = myapi.playercount;
    maxplayers = myapi.maxplayers;
    serverpass = myapi.serverpassword;
    serverversion = myapi.serverversion;
    serveruptime = myapi.uptime;

    tbody_status_color = document.getElementById("tserver-color");
    if (status == "200") {
      tbody_status_color.setAttribute("style", "color:green");
      serverstatus = 'Online';
    } else {
      tbody_status_color.setAttribute("style", "color:red");
      serverstatus = 'Offline';
    }
    tbody_status = document.getElementById("tbody-terraria-status");
    tr_status = tbody_status.replaceWith(serverstatus);
    tbody_status = document.getElementById("tbody-terraria-world");
    tr_status = tbody_status.replaceWith(nameworld);
    tbody_status = document.getElementById("tbody-terraria-ipaddr");
    tr_status = tbody_status.replaceWith("104.248.229.33:" + serverport);
    tbody_status = document.getElementById("tbody-terraria-player");
    tr_status = tbody_status.replaceWith(players + "/" + maxplayers);
    tbody_status = document.getElementById("tbody-terraria-pass");
    tbody_pass_color = document.getElementById("tserver-pass-color");
    if (serverpass == false) {
      tbody_pass_color.setAttribute("style", "color:green");
      serverpasswd = 'No password needded';
    } else {
      tbody_pass_color.setAttribute("style", "color:red");
      serverpasswd = 'Password is needed';
    }
    tr_status = tbody_status.replaceWith(serverpasswd);
    tbody_status = document.getElementById("tbody-terraria-ver");
    tr_status = tbody_status.replaceWith(serverversion);
    tbody_status = document.getElementById("tbody-terraria-uptime");
    tr_status = tbody_status.replaceWith(serveruptime);
    collapsible();
  }
  request.send();

  

};

function globalapprends(name, url, date, size){
  trbase = document.createElement("tr");
  tbody_base.appendChild(trbase);
  td01 = document.createElement("td");
  trbase.appendChild(td01);
  a01 = document.createElement("a");
  a01.innerHTML = name;
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
