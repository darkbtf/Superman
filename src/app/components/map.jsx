var React = require('react');
var mui = require('../../../node_modules/material-ui/lib/index');

var MenuItem = mui.MenuItem;
var FontIcon = mui.FontIcon;

var categories = require('../variables.jsx').categories;
var Parse = require('parse').Parse;

var map;
var bounds;
var CUR_LAT = 25.018553;
var CUR_LNG = 121.536357;

var IconTable = React.createClass({

  getInitialState: function() {
    return {
      menuData: []
    };
  },
  initialize: function() {
    var myPlace = new google.maps.LatLng(25.018553,121.536357)

    var mapOptions = {
      zoom: 18,
      center: myPlace,
      mapTypeId: 'roadmap'
    }

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    var iAmHere = new google.maps.Marker({
      position: myPlace,
      map: map,
      title: 'I am Here',
      zoom: 16
    });

    bounds = new google.maps.LatLngBounds();
  },
  distance: function(location){
    var lat = location._latitude;
    var lng = location._longitude;

    var EARTH_RADIUS = 6378.137; 
    var PI = Math.PI;
    var curLat = CUR_LAT;
    var curLng = CUR_LNG;

    var radLat1 = lat*PI/180.0; 
    var radLat2 = curLat*PI/180.0; 
    var a = radLat1 - radLat2; 
    var b = (lng - curLng)*PI/180.0;

    var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2))); 
    s = s*EARTH_RADIUS; 
    s = Math.round(s*10000)/10000.0; 
    // console.log(s);
    s = Math.round(s*1000);
    return s;
  },

  componentDidMount: function() {

    this.initialize();
    var Case = Parse.Object.extend('Case');
    var query = new Parse.Query(Case);
    var self = this;
    var location = [];
    var locationPlain = [];
    var title = [];
    var reward = [];
    var category = [];
    var dist = [];

    query.find()
      .then(function(results) {
        location = results.map(function(result){return result.get('location')});
        locationPlain = results.map(function(result){ return result.get('locationPlain')});
        
        title = results.map(function(result){return result.get('title')});
        reward = results.map(function(result){return result.get('reward')});
        category = results.map(function(result){return result.get('category')});
        dist = location.map(self.distance);
        // var infoWindowContent = title + category + reward;

        
        var markers = [];
        for(var i = 0; i < location.length; i++){
          var lat = location[i]._latitude;
          var lng = location[i]._longitude;
          markers.push([title[i], lat, lng, reward[i], category[i], dist[i]]);
        }

        // Display multiple markers on a map
        var infoWindow = new google.maps.InfoWindow(), marker, i;

        for(var i = 0; i < markers.length; i++){
          var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
          if (markers[i][5] > 1000)
            continue;
          bounds.extend(position);
          marker = new google.maps.Marker({
            position: position,
            map: map, 
            title: markers[i][0],
            icon: { url: categories[markers[i][4]].url }
          });

          // Allow each marker to have an info window
          google.maps.event.addListener(marker,'click', (function(marker, i){
            return function(){
              var infoWindowContent = "<p>["+markers[i][4]+'] '+markers[i][0]+'<hr>'+markers[i][3];
              infoWindow.setContent(infoWindowContent);
              infoWindow.open(map, marker);
            }
          })(marker, i));

          // Automatically center the map fitting all markers on the screen
          map.fitBounds(bounds);
        }

        // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
        var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event){
          this.setZoom(15);
          google.maps.event.removeListener(boundsListener);
        });

      }, function(err) {

      });

  },

  render: function() {
    return (
      <div>
        <div id="map-canvas" style={{ width: "100%", display: 'block', minHeight: '600px' }}></div>
      </div>
    );

  }
  
});

module.exports = IconTable;



