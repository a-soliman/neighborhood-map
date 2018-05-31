

/* GLOBAL VARIABLES */
let map;
const markers = [];
const locations = [
    {
        name: 'The Trident',
        position: {lat: 37.853405, lng: -122.478708}
    },
    {
        name: 'Angelino',
        position: {lat: 37.854616, lng: -122.479051}
    },
    {
        name: 'Barrel House Tavern',
        position: {lat: 37.855221, lng: -122.478831}
    },
    {
        name: 'Copita',
        position: {lat: 37.856413, lng: -122.480081}
    },
    {
        name: 'Sausalito Ferry Terminal',
        position: {lat: 37.856567, lng: -122.478235}
    }
];


/* INITIALIZING THE MAP */
function initMap() {
    // GET THE MAP CONTAINER AND SET THE OPTIONS
    const mapContainer = document.getElementById('map');
    const mapOptions = {
        center: {lat: 37.855221, lng: -122.478831},
        zoom: 14
    };
    //INITIALIZE THE MAP
    map = new google.maps.Map(mapContainer, mapOptions);

    /* LOOP TO CREATE MARKER PER EACH LOCATION */
    locations.forEach(( location ) => {
        let marker = new google.maps.Marker({
            position: location.position,
            map: map
        });
        console.log(marker)
    });
}