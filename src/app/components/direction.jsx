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
    console.log("dis", this.props.lat, this.props.lng);
    var request = {
      origin: current,
      destination: new google.maps.LatLng(this.props.lat, this.props.lng),
      travelMode: google.maps.TravelMode.WALKING
    };
    // console.log("pos:", location._latitude, location._longitude);
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });
  },
  componentDidMount: function() {
    // console.log(this.props.lat, this.props.lng)
    this.initialize();
    this.calcRoute(new Parse.GeoPoint(this.props.lat, this.props.lng));

  },

  componentDidUpdate: function() {
    this.calcRoute(this.state.location);
    // google.maps.event.addDomListener(window, 'load', self.initialize);
  },

  render: function() {
    return (
      <div>
        <div id="map-canvas" style={{ width: "100%", display: 'block', minHeight:'600px'}}></div>
      </div>
    );

  }
  
});

module.exports = IconTable;



