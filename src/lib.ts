import L from 'leaflet';

const map = L.map('map').setView([37.75, -122.23], 10);
L.esri.basemapLayer('Topographic').addTo(map);
