// way(25865560); damar
// node(548617400); wurlali
// node(1070177665); wuwarlali 


var request = require('request'),
    osmtogeojson = require('osmtogeojson'),
    kmltogeojson = require('togeojson'),
    DOMParser = require('xmldom').DOMParser,
    tj = require('togeojson'),
    fs = require('fs');


var overpassApiUrl = 'http://overpass-api.de/api/interpreter',
    damarIslandQuery = '[out:json];area[name="Indonesia"];way(25865560);(._;>;);out body;',
    damarMountainQuery = '[out:json];area[name="Indonesia"];(node(548617400);node(1070177665););(._;>;);out body;',
    dephutUrl = 'http://appgis.dephut.go.id/appgis/download.aspx',
    damarCriticallandQuery = 'status=view&filename=Maluku.kml&fileFullName=E:\\webgis1\\Peta Tematik Kehutanan1\\KML\\Lahan Kritis\\Maluku.kml';


function saveFile(filename, data) {
    fs.writeFile(filename, data, function(err) {
        if(err) {
            console.log(err);
        }
        console.log("The file " + filename + " was saved!");
    });
}


function printError(code, error) {
    console.log("Error found!");
    console.log("Status Code : " + code);
    console.log("Error Message : " + error);
};


function saveOverpassGeoJson(query, filename) {
    request(overpassApiUrl+'?data='+query, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var osm = JSON.parse(body);
        var geojson = osmtogeojson(osm);
        saveFile(filename, JSON.stringify(geojson));
      } else {
        printError(response.statusCode, error);
      }
    });
}


function saveDephutKml(query, filename) {
    request(dephutUrl+'?'+query, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        saveFile(filename, body);
      } else {
        printError(response.statusCode, error);
      }
    });
}


function convertKmlToGeojson(srcFilename, destFilename) {
    var kml = new DOMParser().parseFromString(fs.readFileSync(srcFilename, 'utf8'));
    var geojson = tj.kml(kml, { styles: true });
    saveFile(destFilename, JSON.stringify(geojson));
}


saveOverpassGeoJson(damarIslandQuery, 'damar_island.geojson');
saveOverpassGeoJson(damarMountainQuery, 'damar_mountain.geojson');
saveDephutKml(damarCriticallandQuery, 'damar_criticalland.kml');
convertKmlToGeojson('damar_criticalland.kml', 'damar_criticalland.geojson');
