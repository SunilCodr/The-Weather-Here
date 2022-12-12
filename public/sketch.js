let btn = document.getElementById('btn');
console.log(btn)
btn.addEventListener('click', sbtDatabase)
async function sbtDatabase() {

    let city = document.getElementById('city').value;
    let lat, log, temp_c, parameter, value,cityName,regionName;
    try {
        const api_key = `2f2c5b8adbb74db6bc0161305220612`;
        console.log(process)
        const api_url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=yes`;
        const response = await fetch(api_url).then((response) => {
            if (response.status == 400) {
                document.getElementById('error').textContent = `Not found the locatio  "${city}"`
                throw new Error(`not found the location "${city}"`);
            }
            document.getElementById('error').textContent = '';
            return response;
        });
        const json = await response.json();
        console.log(json);
        lat = json.location.lat;
        log = json.location.lon;
         cityName = json.location.name;
         regionName = json.location.region;
        temp_c = json.current.temp_c;
        let image = json.current.condition.icon;
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = log;
        document.getElementById('cityName').textContent = cityName;
        document.getElementById('regionName').textContent = regionName;
        document.getElementById('temp').textContent = temp_c;
        document.getElementById('weather-img').src = image;


        const aq_url = `aq/${lat},${log}`;
        const aq_req = await fetch(aq_url);
        const aq_res = await aq_req.json();
        console.log(aq_res);
        parameter = aq_res.results[0].measurements[0].parameter;
        console.log(parameter);
         value = aq_res.results[0].measurements[0].value;
        document.getElementById('parameter').textContent = parameter;
        document.getElementById('value').textContent = value;



    }
    catch (error) {
        parameter = -1;
        cityName = cityName;
        regionName = regionName; 
        console.error('I handle it',error);
    }

    console.log(cityName)
    const data = { lat, log, cityName, regionName, temp_c, parameter, value };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const requestPost = await fetch('/api', options);
    const responseJson = await requestPost.json();
    console.log('this is server response', responseJson);

}


