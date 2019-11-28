let initLon = 22.3;
let initLat = 60.5;

const map = new ol.Map({
    target: 'map_id',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([initLon, initLat]),
        zoom: 11
    })
});

function getBuslines(){
    let url = 'https://data.foli.fi/gtfs/v0/routes';
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = generateDropdown;
    request.send();
}

function generateDropdown() {
    if(this.status === 200){
        let data = JSON.parse(this.response);
        let routes = [];
        let i;
        let dropdown = document.getElementById('route_list');
        for(i=0; i<data.length; i++){
            routes[i] = data[i]["route_short_name"];
        }
        for(i=0; i<routes.length; i++){
            let opt = document.createElement('option');
            opt.text = routes[i];
            opt.value = routes[i];
            dropdown.options.add(opt);
        }
    }
}

function showBuses() {
    let url = 'https://data.foli.fi/siri/vm';
    let request = new XMLHttpRequest();
    request.open('GET', url);
    if(request.status === 200){
        let data = JSON.parse(request.response);
        let buses = [];
        let selection = document.getElementById('route_list').options.value;
        console.log(selection);
        let i;
        for(i=0; i<data.length; i++){
            if(data[i]['route_short_name'] === selection){
                buses[i] = data[i]['longitude']['latitude'];
                console.log(buses[i]);
            }
        }
    }
    request.send();
    console.log(request.status)
}

function showRoute() {
    let url = 'https://data.foli.fi/gtfs/v0/routes';
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = fetchTrip;
    request.send();
}

function fetchTrip() {
    if(this.status === 200){
        let data = JSON.parse(this.response)
        let selection = document.getElementById('route_list').options.value;
        console.log(selection);
        let route_id;
        let i;
        for(i=0; i<data.length; i++){
            if(data[i]['route_short_name'] === selection){
                route_id = data[i]['route_id']
            }
        }
        console.log(route_id);
        let url = 'http://data.foli.fi/gtfs/v0/20191128-102321/trips/route/' + route_id;
        let request = new XMLHttpRequest();
        request.open('GET', url);
        let trip_data = JSON.parse(request.response);
        let trip_id = trip_data['shape_id'];
        request.send();
        let shape_url = 'http://data.foli.fi/gtfs/v0/20191128-102321/shapes/0_' + trip_id;
        let shape_request = new XMLHttpRequest();
        shape_request.open('GET', shape_url);
        let shape_data = JSON.parse(shape_request.response);
        let coordinates = [];
        for(i=0; i<shape_data.length; i++){
            coordinates[i] = shape_data[i]['lat']['lon']
        }
        ol.LineString(coordinates);
    }
}


function OnLoad() {
    getBuslines();
    document.getElementById('show_buses_button').addEventListener("click", showBuses);
    document.getElementById('show_route_button').addEventListener("click", showRoute);
}

window.onload = OnLoad;
