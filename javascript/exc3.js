let initLon = 22.3;
let initLat = 60.5;

const map = new ol.Map({
    target: 'map_id',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                image: new ol.style.Icon({
                    src: '../images/nuoli.png',
                    anchor: [0.5, 32],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    opacity: 1,
                    scale: 1
                })
            })
        }),

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
    request.onload = drawBusMarkers;
    request.send();
}

function drawBusMarkers() {
    if(this.status === 200){
        let data = JSON.parse(this.response);
        let buses = [];
        let selection_menu = document.getElementById('route_list');
        let selection = selection_menu.options[selection_menu.selectedIndex].value;
        console.log("selection:" + selection);
        let i;
        for(i=0; i<data.length; i++){
            if(data['result']['vehicles'][i]['publishedlinename'] === selection){
                buses[i] = [
                    data[i]['longitude'],
                    data[i]['latitude']
                ];
                console.log(buses[i]);
            }
        }
        for(i=0; i<buses.length; i++){
            let source = map.getLayers()['array_'][1].getSource();
            source.addFeature(
                new ol.Feature(
                    new ol.geom.Point(
                        ol.proj.fromLonLat(buses[i])
                    )
                )
            )
        }

    }
    else{
        console.log("parse failed")
    }
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
        let data = JSON.parse(this.response);
        let selection_menu = document.getElementById('route_list');
        let selection = selection_menu.options[selection_menu.selectedIndex].value;
        console.log("selection: " + selection);
        let route_id;
        let i;
        for(i=0; i<data.length; i++){
            if(data[i]['route_short_name'] === selection){
                route_id = data[i]['route_id']
            }
        }
        console.log(route_id);
        let url = 'https://data.foli.fi/gtfs/v0/20191128-102321/trips/route/' + route_id;
        console.log("trip url: " + url);
        let request = new XMLHttpRequest();
        let trip_id;
        request.open('GET', url, false);
        request.send();
        if(request.status === 200) {
            let trip_data = JSON.parse(request.response);
            trip_id = trip_data[0]['shape_id'];
            request.open('GET', url);
        }
        else{
            console.log("Fetching trips failed");
        }

        let shape_url = 'http://data.foli.fi/gtfs/v0/20191128-102321/shapes/' + trip_id;
        console.log("shape url: " + shape_url);
        let shape_request = new XMLHttpRequest();
        shape_request.open('GET', shape_url, false);
        shape_request.send();
        let shape_data = JSON.parse(shape_request.response);
        let coordinates = [];
        for(i=0; i<shape_data.length; i++) {
            coordinates.push(
                new ol.proj.fromLonLat([
                    shape_data[i]['lon'],
                    shape_data[i]['lat']
                ])
        )
        }
        console.log("coords: " + coordinates);
        let ls_layer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#8d0000',
                    width: 5
                })
            })
        });
        map.addLayer(ls_layer);
        let source = map.getLayers()['array_'][2].getSource();
        source.addFeature(
            new ol.Feature(
                new ol.geom.LineString(coordinates)
            )
        )


    }
}


function OnLoad() {
    getBuslines();
    document.getElementById('show_buses_button').addEventListener("click", showBuses);
    document.getElementById('show_route_button').addEventListener("click", showRoute);

}

window.onload = OnLoad;
