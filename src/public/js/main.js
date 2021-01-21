//Ubicacion inicial del  mapa
const map =L.map('map-template').setView([-34.6083,-58.3712],12);

//Template a utilizar
const tileURL= 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
L.tileLayer(tileURL).addTo(map);

//Ubucacion actual
map.locate({enableHighAccuracy:true});
map.on('locationfound',e=>{
    const coords=[e.latlng.lat, e.latlng.lng];
    const marker=L.marker(coords);
    marker.bindPopup('Ubicacion actual');
    map.addLayer(marker);
});

//Marcar con doble click
map.on('dblclick', e =>{
    let latLng = map.mouseEventToLatLng(e.originalEvent);
    const coords=[latLng.lat, latLng.lng];
    const marker=L.marker(coords);
    map.addLayer(marker);
})

//Cancelar zoom al hacer doble click
map.doubleClickZoom.disable();

//Crear un Popup en ubicacion en particular
const marker=L.marker([-34.6083,-58.3712]);
marker.bindPopup('Ciudad de buenos aires');
map.addLayer(marker);

//Geolocalizacion
let markerGeo=null;
const updateMap=()=>{
    const urlGeo = 'http://api.open-notify.org/iss-now.json';
fetch(urlGeo)
.then(res=>res.json())
.then(data=>{
    if(markerGeo){
        map.removeLayer(markerGeo)
    }
    const {latitude, longitude}=data.iss_position;
    const coords=[latitude, longitude];
    markerGeo=L.marker(coords).addTo(map)
   
})
setTimeout(updateMap, 1000)
}
 updateMap()



 //Marcador circular
 var circle = L.circle([-34.6083,-58.3712], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 1000
}).addTo(map);

//poligon
var polygon = L.polygon([
    [-34.66182308737559, -58.36573935936066],
    [-34.70043104589618, -58.30720282985709],
    [-34.726959164195364, -58.33363868185681]
]).addTo(map);