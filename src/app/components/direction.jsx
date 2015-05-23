var React = require('react');
var mui = require('../../../node_modules/material-ui/lib/index');

var MenuItem = mui.MenuItem;
var FontIcon = mui.FontIcon;

var categories = require('../variables.jsx').categories;
var Parse = require('parse').Parse;

var geocoder;
var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var CUR_LAT = 25.018553;
var CUR_LNG = 121.536357;
var current;

var IconTable = React.createClass({

  getInitialState: function() {
    return {
      location: null
    };
  },
  initialize: function() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    current = new google.maps.LatLng(CUR_LAT, CUR_LNG);
    var mapOptions = {
      zoom:16,
      center: current
    }
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    directionsDisplay.setMap(map);
  },
  calcRoute: function(location){
    if (location == null) return;
    var request = {
      origin: current,
      destination: new google.maps.LatLng(location._latitude, location._longitude),
      travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
        return 1;
      }
    });
  },
  componentDidMount: function() {

    this.initialize();
    this.calcRoute(this.state.location);
  },

  componentDidUpdate: function() {
    this.calcRoute(this.state.location);
  },

  render: function() {
    return (
      <div>
        <div id="map-canvas" style={{ width: "100%", display: 'block', minHeight:'500px'}}></div>
      </div>
    );

  }
  
});

module.exports = IconTable;



