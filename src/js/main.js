/* GLOBAL VARIABLES */
let map;
let infoWindow;
const markers = [];
const backupLocations = [
    {
        name: 'The Trident',
        position: {lat: 37.853405, lng: -122.478708},
        image: 'https://s3-media3.fl.yelpcdn.com/bphoto/SavnswRo8GIvK1nKc-boyA/o.jpg',
        rating: 3.5,
        address: '558 Bridgeway',
        highlighted: ko.observable(false)
    },
    {
        name: 'Napa Valley Burger Company',
        position: {lat: 37.854616, lng: -122.479051},
        image: 'https://s3-media2.fl.yelpcdn.com/bphoto/c4qNa-lDiZkMWRCirX1lgA/o.jpg',
        rating: 4,
        address: '670 Bridgeway',
        highlighted: ko.observable(false)
    },
    {
        name: 'Barrel House Tavern',
        position: {lat: 37.855221, lng: -122.478831},
        image: 'https://s3-media3.fl.yelpcdn.com/bphoto/ndYSXvbqcxIthPof8nNbow/o.jpg',
        rating: 3.5,
        address: '660 Bridgeway',
        highlighted: ko.observable(false)
    },
    {
        name: 'Lighthouse Cafe',
        position: {lat: 37.856413, lng: -122.480081},
        image: 'https://s3-media4.fl.yelpcdn.com/bphoto/rx9px8mrxgCFKU0img12MA/o.jpg',
        rating: 4,
        address: '1311 Bridgeway',
        highlighted: ko.observable(false)
    },
    {
        name: 'Seafood Peddler',
        position: {lat: 37.856567, lng: -122.478235},
        image: 'https://s3-media1.fl.yelpcdn.com/bphoto/p6xdlY3vpG-G7WeGAFYOyA/o.jpg',
        rating: 3.5,
        address: '303 Johnson St',
        highlighted: ko.observable(false)
    }
];


/* KO */
function AppViewModel() {
    const self = this;

    self.spinner = ko.observable(false);
    self.locations = ko.observableArray();

    self.filteredLocations = ko.observableArray();
    self.filterString = ko.observable('');

    self.dataLoadError = ko.observable(false);

    /* SINGAL HIGHLIGHT STATE TO THE VIEWMODEL */
    self.signalHighlited = function (data) {
        let name = data.name;
        for ( let i = 0; i < self.locations().length; i++ ) {
            let location = self.locations()[i];
        
            if ( location.name == name ) {
                location.highlighted(true);

                let marker = markers.filter((item) => item.name == name)[0];
                    if ( marker ) {
                        self.animateBouncing(marker);
                        self.displayInfoWindow(marker);
                    }

            } else {
                location.highlighted(false);
            }
        }
    };

    /*  SET BOUNSING ANIMATION ON MARKER */
    self.animateBouncing = function (givenMarker) {
        markers.forEach(( marker ) => {
            if ( marker == givenMarker ) {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
            else {
                marker.setAnimation(null);
            }
        });
    };

    /* DISPLAYS AN INFOWINDOW IF A RESTAURANT IS HIGHLIGHTED */
    self.displayInfoWindow = function(marker) {
        infoWindow.setContent( `
            <div class="infoWindow">
                <h3 class="name">${marker.name}</h3>
                <h4 class="rating">Yelp Rating: ${marker.rating}</h4>
                <p>${marker.address}</p>
                <img src="${marker.image}">
            </div>
            `);
            infoWindow.open(map, marker);
    };

    self.search = function() {
        let value = self.filterString();

        if ( value.length > 0 ) {
            let result = self.locations().filter(( location ) => {
                return location.name.toLowerCase().includes(value);
            });
            self.filteredLocations(result);
        }
        else {
            self.filteredLocations([]);
        }
        self.filterMarkers(value);
    };

    self.filterMarkers = function( value ) {
        let markersToHide = markers.filter(( marker ) => {
            return marker.name.toLowerCase().indexOf(value) == -1;
        });
        let markersToDisplay = markers.filter(( marker ) => {
            return marker.name.toLowerCase().indexOf(value) != -1;
        });
        
        markersToHide.forEach(( marker ) => {
            marker.setMap(null);
        });
        markersToDisplay.forEach(( marker ) => {
            marker.setMap(map);
        });
    };

    self.toggleNav = function() {
        let navContainer = $('.list-container');
        let toggleIcon = $('.toggle-icon');

        navContainer.toggle();
        if ( navContainer.is(":visible")) {
            toggleIcon.removeClass('fa-arrow-right').addClass('fa-arrow-left');
        }
        else {
            toggleIcon.removeClass('fa-arrow-left').addClass('fa-arrow-right');
        }
        

    };


}

let viewModel = new AppViewModel();

/* INITIALIZING THE MAP */
function initMap() {
    // GET THE MAP CONTAINER AND SET THE OPTIONS
    const mapContainer = document.getElementById('map');
    const mapOptions = {
        center: {lat: 37.855221, lng: -122.478831},
        zoom: 14,
        mapTypeId: 'roadmap'
    };

    //INITIALIZE THE MAP
    map = new google.maps.Map(mapContainer, mapOptions);

    /* LOOP TO CREATE MARKER PER EACH LOCATION */
    viewModel.locations().forEach(( location, i ) => {
        let marker = new google.maps.Marker({
            position: location.position,
            map: map,
            name: location.name,
            image: location.image,
            rating: location.rating,
            address: location.address,
            id: i

        });

        infoWindow = new google.maps.InfoWindow();

        marker.addListener('click', function() {
            infoWindow.setContent( `
            <div class="infoWindow">
                <h3 class="name">${marker.name}</h3>
                <h4 class="rating">Yelp Rating: ${marker.rating}</h4>
                <p>${marker.address}</p>
                <img src="${marker.image}">
            </div>
            `);
            infoWindow.open(map, marker);
            viewModel.signalHighlited(marker);
        });

        markers.push(marker);
    });

}

function getLocationsFromYelp() {
    fetch('http://localhost:3333')
        .then( function(response) {
            if (response.status !== 200 ) {
                response.json().then( ( data ) => {
                    console.log('check the backend');
                    viewModel.locations(backupLocations);
                    initMap();

                });
                return;
            }
            response.json().then(function(data) {
                data.forEach(( item ) => {
                    item.highlighted = ko.observable(false);
                });
                viewModel.locations(data);
                viewModel.dataLoadError(false);
                initMap();
            });
        })
        .catch( function( err ) {
            console.log('Fetch Error :-S', err);
            viewModel.locations(backupLocations);
            viewModel.dataLoadError(true);
            alert('Error has occurred while loading data, results will be limited..');
            initMap();
        });
}

function raiseGAPIError() {
    alert('Error loading GMaps API script.');
}

getLocationsFromYelp();


ko.applyBindings(viewModel);