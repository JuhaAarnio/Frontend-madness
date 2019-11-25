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
    let url = 'http://data.foli.fi/gtfs/v0/20191114-135003/routes';
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = generateDropdown;
    request.send();
}

function generateDropdown() {
    if(this.status === 200){
        let data = JSON.parse(this.response);
        let lines = [];
        let i;
        for(i=0; i<data.length; i++){
            lines[i] = data['route_long_name'][i];
        }
    }
}
