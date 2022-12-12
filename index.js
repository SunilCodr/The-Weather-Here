const express = require('express');
const Datastore = require('nedb');
require('dotenv').config();
console.log(process.env);
const app = express();

app.listen(3000, ()=> console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();


app.get('/api', (request, response) => {
    database.find({},(err,data)=> {
        if(err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post('/api', (request, response) => {
    console.log('I go a request!');
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    console.log('This is data',data);
    database.insert(data);
    response.json(data);
});

app.get('/aq/:latlon',async (request,response)=> {
    const latlon = request.params.latlon.split(',');
    const lat = latlon[0];
    const lng = latlon[1];
    console.log(latlon);
    const aq_url = `https://api.openaq.org/v2/latest?limit=10&page=1&offset=0&sort=desc&coordinates=${lat}%2C${lng}&radius=100000&order_by=lastUpdated&dumpRaw=false`;
    const aq_response = await fetch(aq_url);
    const aq_data = await aq_response.json();

    response.json(aq_data);
});
