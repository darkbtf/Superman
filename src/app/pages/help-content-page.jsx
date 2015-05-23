var React = require('react');
var mui = require('../../../node_modules/material-ui/lib/index');

var GetHelpTable = require('../components/get-help-table.jsx');
var Navbar = require('../components/navbar.jsx');
var Direction = require('../components/direction.jsx');
var { AppBar, AppCanvas, Menu, IconButton } = mui;
var Parse = require('parse').Parse;

var CUR_LAT = 25.018553;
var CUR_LNG = 121.536357;

var DATA = {
	comments: [ {
		profile: "./images/face-2.png",
		name: '超人',
		text: '走開！讓專業的來',
		type: 'superman',
		reply: '來吧 >//////<'
	}, {
		profile: "./images/face-0.png",
		name: '路人',
		text: '哈哈！你看看你！',
		type: 'passer'
	}, {
		profile: "./images/thrall.png",
		name: '索爾',
		text: '元素會摧毀你',
		type: 'passer'
	}
	]
};

var dateToString = function(date) {
 return date.getFullYear() + " 年 " + 
                        (date.getMonth() + 1 )+ " 月 " + 
                        date.getDate() + " 日 " +
                        zeroPad(date.getHours(), 2) + " : " +
                        zeroPad(date.getMinutes(), 2) + " : " +
                        zeroPad(date.getSeconds(), 2);
};

var zeroPad = function(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
};

var HelpContent = React.createClass({
	getInitialState: function() {
		return {
			title: "",
			peopleRequired: 0
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
					self.refs.navbar.setState({ location: data.get('location'), contentId: data.id });

					console.log(data.get('time'));
					self.setState({ title: data.get('title'), peopleRequired: data.get('peopleRequired') });
					self.refs.table.setState({
						title: data.get('title'),
						category: data.get('category'),
						time: dateToString(data.get('time')),
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
    var comments = DATA.comments.map(function(comment) {
    	var tag = (<div className="tag">
	        					接受幫助
	        				</div>);
    	var replies = null;
    	if (comment.reply) {
    		replies = (
    			<div className="replies">
    				<div className="reply">
    					<div className="reply-title">版主回覆</div>
    					<div className="reply-content">{ comment.reply }</div>
    				</div>
    			</div>);
    	}
    	return (
	    	<div className="comment-paper">
	        		<div className="photo">
	        			<img src={ comment.profile } />
	        		</div>
	        		<div className="content">
	        			<div className="header-container">
	        				<div className="name">
	        					{ comment.name }
	        				</div>
	        				{ comment.type == 'superman' ? tag : null }
	        			</div>
	        			<div className="text">
	        				{ comment.text }
	        			</div>
	        				{ replies }
	        		</div>
	        	</div>);
    });

    return (
      <AppCanvas>
        <Navbar title={ this.state.title } leftButton="back" prev="/help-list" rightButton="location" ref="navbar" />
        <GetHelpTable ref="table" />
        <div className="custom-button-container">
        	<div className="custom-button-wrapper help">
	        	<div className="custom-button">
	        		讓我拯救你 ({this.state.peopleRequired})
	        	</div>
        	</div>
        	<div className="custom-button-wrapper leave-message">
	        	<div className="custom-button">
	        		留言
	        	</div>
        	</div>
        </div>
        <div className="comment-container">
        	{ comments }
        	<div className="no-more-comments">
        		沒有更多回覆了。
        	</div>
        </div>
      </AppCanvas>
    );
  }
  
});

module.exports = HelpContent;



