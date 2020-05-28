import L from 'leaflet';

const map = L.map('map').setView([41.4856013, -74.062379], 10);

L.esri.basemapLayer('Topographic').addTo(map);

