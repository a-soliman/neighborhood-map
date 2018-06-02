# Sausalito Restaurants Map

## A Google Maps with Yelp API


### Features:

- Yelp Fusion API, will search for all the restaurants in Sausalito, CA, provide the rating alogingside with an image, lng/lng and address.

- Google Maps API will display marker to each location and genrates an info window for each one.

- The App contains realtime search box to filter the displayed list items and markers.

- Incase of failuer to run the load the data from the serverside, the application will display backup list of 5 locations instead.

----

### Technologies:
1. Server Side
    - Nodejs
    - Express
    - Yelp-Fusion API

1. Client Side
    - KnockOut.js
    - jQuery
    - Sass
    - Bootstrap4
    - Gulp
    - Babel
    - Font-Awesome

----
### Installation:
1. Install [Node](https://nodejs.org/en/)
1. Install Gulp CLI
    ```bash
    npm install gulp-cli -g
    npm install gulp -D
    ```
1. Clone this REPO
    ```bash
    git clone https://github.com/a-soliman/neighborhood-map.git
    ```
    ```bash
    cd neighborhood-map/
    ```

1. Install the requirments
    1. From the root '/ ' Run 'npm install' or 'npm i' to install the needed packages.
    ```bash
    npm install
    ```

----
### Run Application:
1. from the root '/ ' run the server
    ```bash
    node app.js
    ```

1. With the server runing, open a new bash terminal and and run 'gulp server' to complile the application.
    ```bash
    gulp server
    ```

1. open your browser at port 3000 => [http://localhost:3000](http://localhost:3000)

