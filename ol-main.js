urls = [
    'damar_island.geojson',
    'damar_criticalland.geojson',
    'damar_mountain.geojson',
]

var geoJson = [];
for (url of urls) { geoJson.push($.getJSON(url)); }

function createLayer(json) {
    return new ol.layer.Vector({
        source: new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(json)
        }),
        style: styleFunction
    });
}

$.when.apply(null, geoJson).done(function() {
    layers = [ new ol.layer.Tile({source: new ol.source.OSM()})];
    for(var i=0; i<arguments.length; i++) {
        layers.push(createLayer(arguments[i][0]));
    }

    var map = new ol.Map({
        target: 'map',
        layers: layers,
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [128.6, -7.14],
            zoom: 11.5,
        })
    });
});
