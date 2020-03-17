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

