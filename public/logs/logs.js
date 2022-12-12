const mymap = L.map('checkinMap').setView([0, 0], 1);
const attribution =
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

 getData();
    async function getData() {
        const response = await fetch('/api');
        const data  = await response.json();

        for(item of data) {
     const marker = L.marker([item.lat, item.log]).addTo(mymap);
     let txt = `latitude <span id="latitude">${item.lat}</span>&deg;, longitude <span id="longitude">${item.log}</span>&deg; City: <span style="font-weight: bold;" id="cityName">${item.cityName}</span> Region: <span style="font-weight: bold;" id="regionName">${item.regionName}</span><br>`
          if(item.parameter < 0) {
            txt += `No Temperature reading`
          }
          else {
            txt += `Temperature <span style="font-weight: bold;" id="temp">${item.temp_c}</span>&deg; celsius <br> Measurements <br> Parameter <span id="parameter">${item.parameter}</span> value <span id="value">${item.value}</span>;`
          }
     

     marker.bindPopup(txt);
    }
    console.log(data);
        
    };