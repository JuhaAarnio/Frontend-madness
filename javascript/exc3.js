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
    let url = 'http://data.foli.fi/gtfs/v0/routes';
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
    let url = 'http://data.foli.fi/siri/vm';
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

function OnLoad() {
    getBuslines();
    document.getElementById('show_buses_button').onclick = showBuses;
}

window.onload = OnLoad;
