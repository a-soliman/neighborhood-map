/* GLOBAL VARIABLES */
let map;
const markers = [];

/* KO */
function AppViewModel() {
    const self = this;

    self.locations = ko.observableArray([
        {
            name: 'The Trident',
            position: {lat: 37.853405, lng: -122.478708},
            highlighted: ko.observable(false)
        },
        {
            name: 'Angelino',
            position: {lat: 37.854616, lng: -122.479051},
            highlighted: ko.observable(false)
        },
        {
            name: 'Barrel House Tavern',
            position: {lat: 37.855221, lng: -122.478831},
            highlighted: ko.observable(false)
        },
        {
            name: 'Copita',
            position: {lat: 37.856413, lng: -122.480081},
            highlighted: ko.observable(false)
        },
        {
            name: 'Sausalito Ferry Terminal',
            position: {lat: 37.856567, lng: -122.478235},
            highlighted: ko.observable(false)
        }
    ]);

    self.filteredLocations = ko.observableArray();
    self.filterString = ko.observable();

    /* SINGAL HIGHLIGHT STATE TO THE VIEWMODEL */
    self.signalHighlited = function (name) {
        for ( let i = 0; i < self.locations().length; i++ ) {
            let location = self.locations()[i];
        
            if ( location.name == name ) {
                location.highlighted(true);

                let marker = markers.filter((item) => item.name == name)[0];
                    if ( marker ) {
                        self.animateBouncing(marker)
                    }

            } else {
                location.highlighted(false);
            }
        };
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
        })
    };

    self.search = function() {
        let value = self.filterString();
        let result = self.locations().filter((location) => {
            return location.name.toLowerCase().includes(value);
        });
        self.filteredLocations(result);
    }


}

let viewModel = new AppViewModel()

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
    viewModel.locations().forEach(( location, i ) => {
        let marker = new google.maps.Marker({
            position: location.position,
            map: map,
            name: location.name,
            id: i

        });

        let infoWindow = new google.maps.InfoWindow({
            content: marker.name
        });

        markers.push(marker);

        marker.addListener('click', function() {
            infoWindow.open(map, marker);
            viewModel.signalHighlited(marker.name);
        });
    });
}



ko.applyBindings(viewModel)