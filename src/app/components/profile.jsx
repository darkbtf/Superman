var React = require('react');
var mui = require('../../../node_modules/material-ui/lib/index');

var MenuItem = mui.MenuItem;
var FontIcon = mui.FontIcon;
var Navigation = require('react-router').Navigation;

var categories = require('../variables.jsx').categories;
var Parse = require('parse').Parse;

var CUR_LAT = 25.018553;
var CUR_LNG = 121.536357;

var Profile = React.createClass({
  mixins: [Navigation],
  getInitialState: function() {
    return {
      caseData: []
    };
  },
  componentDidMount: function() {
    var Case = Parse.Object.extend('Case');
    var query = new Parse.Query(Case);
    var self = this;
		query.equalTo("solverId","zNNXuEuD85");
    query.find()
      .then(function(results) {
        results.forEach(function(result) {
          self.state.caseData.push({
            id: result.id,
            title: result.get('title'), 
            gender: result.get('gender'),
            reward: result.get('reward'),
						date: result.updatedAt,
						rank: result.get('rank'),
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
              var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + 
									Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2))); 
              s = s*EARTH_RADIUS; 
              s = Math.round(s*10000)/10000.0; 
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
  handleRate: function(index) {
    var self = this;
    return function() {
      var tmp = self.state.caseData[index].rank;
      self.state.caseData[index].rank = (tmp != undefined) ? Math.min(5, tmp + 1): 0;
      self.forceUpdate();
    };
  },
  render: function() {
    var self = this;
		var my_rank =3.5;
		var caseItems = this.state.caseData.map(function(d, index){
			var heart = function(number){
        if (number == undefined) return null;
				var type=[];
				var integer = parseInt(number);
				for(var i=1;i<=integer;i++) type.push('full');
				if (integer < 5) {
          if(integer < number) type.push('half');
          else type.push('empty');
        }
				for(var i=1;i<=4-integer;i++) {
          console.log(integer);
          type.push('empty');
				}
        return type.map(function(a){
					return (<img src={'./images/'+a+'_heart.png'}/>);
				});
			}(d.rank);
			console.log(d);
			var date = new Date(d.date);
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var day = date.getDate();
      var rateButton = (
        <div className="rate-button">
          <div className="custom-button">給評價</div>
        </div>
      );

     
			return (
        <div className="item-table" style={{ width: '100%' }} onClick={self.handleRate(index)}>
          <div className={"help-category fa fa-" + categories[d.category].icon + " " + categories[d.category].color } />
          <div className="help-content" style={{ width: 'calc(100%-60px)', height: '100%', overflow: 'none'}}>
            <div style={{ width: 'calc(100%-110px)', float: 'left'}}>
              <div className="help-title" style={{ width: '100%' }}>{d.title}</div>
              <div className="help-subtitle">
                <FontIcon className={"fa fa-user " + d.gender} />
                <span className="reward">{d.reward}</span>
                <span className="distance">{d.distance}m</span>
              </div>
            </div>
            <div style={{float: 'right', display: 'inline-block', height: '100%', paddingRight: '0px', marginRight: '-10px', width: '100px'}}>
              { heart || rateButton }
              <div style={{margin: '0', padding:'0'}}> {year+'/'+month+'/'+day} </div>
            </div>
          </div>  
        </div>
      );
    });
     var my_heart = (function(number){
        var type=[];
        var integer = parseInt(number);
        for(var i=1;i<=integer;i++) type.push('full');
        if (integer < 5) {
          if(integer < number) type.push('half');
          else type.push('empty');
        }
        for(var i=1;i<=4-integer;i++) type.push('empty');
        return type.map(function(a){
          return (<img src={'./images/big_'+a+'_heart.png'} />);
        });
      }(my_rank));
    return (
      <div>
				<div className="profile-header">
          <div className="profile-photo">
					  <img src='./images/bitmap.png'/>
          </div>
          <div className="profile-name">
            朱蝴蝶
          </div>
				</div>
				<div>
				</div>
				<div className="profile-rating">
          <div className="profile-rating-text">
            以往紀錄
          </div>
          <div className="profile-rating-hearts">
            { my_heart }
          </div>
        </div>
				<div>
        	{caseItems}
				</div>
      </div>
    );
  }
});

module.exports = Profile;
