const map =L.map('map-template').setView([-34.6083,-58.3712],13);

const tileURL= 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';

L.tileLayer(tileURL).addTo(map);

map.locate({enableHighAccuracy:true});
map.on('locationfound',e=>{
    const coords=[e.latlng.lat, e.latlng.lng];
    const marker=L.marker(coords);
    marker.bindPopup('Ubicacion actual');
    map.addLayer(marker);
})

const marker=L.marker([-34.6083,-58.3712]);
marker.bindPopup('Ciudad de buenos aires');

map.addLayer(marker);