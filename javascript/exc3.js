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
