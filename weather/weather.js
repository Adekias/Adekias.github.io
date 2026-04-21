//create a new map centered on the continental US
var map = L.map('map').setView([38, -95], 4);

//add OpenStreetMap to the map
var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//add weather radar to map
var radarUrl = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
  layers: 'nexrad-n0r-900913',
  format: 'image/png',
  transparent: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);

//Get GeoJSON data from the NWS weather alerts API
var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';
$.getJSON(weatherAlertsUrl, function(data) {
L.geoJSON(data, {
style: function(feature){
  var alertColor = 'orange';
  if (feature.properties.severity === 'Severe') alertColor = 'red';
  return { color: alertColor };
},

//Add a popupon each feature showing the NWS alert headline
onEachFeature: function(feature, layer) {
  layer.bindPopup(feature.properties.headline);
}
}).addTo(map);
});
