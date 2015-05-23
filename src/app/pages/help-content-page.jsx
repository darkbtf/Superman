var React = require('react');
var mui = require('../../../node_modules/material-ui/lib/index');

var GetHelpTable = require('../components/get-help-table.jsx');
var Navbar = require('../components/navbar.jsx');
var Direction = require('../components/direction.jsx');
var { AppBar, AppCanvas, Menu, IconButton } = mui;
var Parse = require('parse').Parse;

var CUR_LAT = 25.018553;
var CUR_LNG = 121.536357;

var HelpContent = React.createClass({
	getInitialState: function() {
		return {
			title: "" 
		};
	},
	componentDidMount: function() {
		var self = this;
		var Case = Parse.Object.extend('Case');
		var query = new Parse.Query(Case);
		var id = this.props.params.contentId;
		query.get(id)
			.then(
				function(data) {
					console.log("hcp", data.get('location'));
					self.refs.navbar.setState({ location: data.get('location') });

					console.log(data.get('time'));
					self.setState({ title: data.get('title') });
					self.refs.table.setState({
						title: data.get('title'),
						category: data.get('category'),
						time: data.get('time'),
						peopleRequired: data.get('peopleRequired'),
						locationPlain: data.get('locationPlain'),
						distance: function(location){
							console.log(location._latitude, location._longitude);
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
			            }(data.get('location')),
						reward: data.get('reward')
					});
				},
				function(err) {

				}
			);
	},

  render: function() {
    return (
      <AppCanvas>
        <Navbar title={ this.state.title } leftButton="back" rightButton="edit" ref="navbar" />
        <GetHelpTable ref="table" />
      </AppCanvas>
    );
  }
  
});

module.exports = HelpContent;



