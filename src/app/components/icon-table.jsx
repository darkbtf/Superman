var React = require('react');
var mui = require('../../../node_modules/material-ui/lib/index');

var MenuItem = mui.MenuItem;
var FontIcon = mui.FontIcon;
var Navigation = require('react-router').Navigation;

var categories = require('../variables.jsx').categories;
var Parse = require('parse').Parse;

var CUR_LAT = 25.018553;
var CUR_LNG = 121.536357;

var IconTable = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    return {
      menuData: []
    };
  },
  componentDidMount: function() {
    console.log(this.changeRoute);
    var Case = Parse.Object.extend('Case');
    var query = new Parse.Query(Case);
    var self = this;
    query.find()
      .then(function(results) {
        console.log(results);
        results.forEach(function(result) {
          self.state.menuData.push({
            id: result.id,
            title: result.get('title'), 
            gender: result.get('gender'),
            reward: result.get('reward'),
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
            }(result.get('location')),
            category: result.get('category')
          });

        });
        self.forceUpdate();
      }, function(err) {

      });
  },
  viewHelp: function(id) {
    var self = this;
    return () => {
      self.transitionTo('/help-content/' + id)
    };
  },
  render: function() {
    var self = this;
    var menuItems = this.state.menuData.map(function(d){
      console.log(d.gender);
      var background = {
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(./images/' + d.gender + '.png)',
        backgroundPosition: 'center left',
        backgroundSize: '12px 100%'
      };
      return (
        <div onClick={ self.viewHelp(d.id) } className="item-table" style={ background }>
          <div className={"help-category fa fa-" + categories[d.category].icon + " " + categories[d.category].color } />
          <div className="help-content" >
            <div className="help-title">{d.title}</div>
            <div className="help-subtitle">
              <FontIcon className={"fa fa-user " + d.gender} />
              <span className="reward">{d.reward}</span>
              <span className="distance">{d.distance}m</span>
            </div>
          </div>
        </div>
      );
    });
    
    return (
      <div>
        {menuItems}
      </div>
    );

  }
  
});

module.exports = IconTable;



