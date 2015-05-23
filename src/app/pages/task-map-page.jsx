var React = require('react');
var mui = require('../../../node_modules/material-ui/lib/index');

var IconTable = require('../components/icon-table.jsx');
var Direction = require('../components/direction.jsx');
var Navbar = require('../components/navbar.jsx');
var { AppBar, AppCanvas, Menu, IconButton } = mui;

var HelperMap = React.createClass({

  render: function() {
  	console.log("tmp", this.props.query.lng, this.props.query.lat);
    return (
      <AppCanvas>
        <Navbar title="任務出發" leftButton="back" />
        <Direction lat={this.props.query.lat} lng={this.props.query.lng} />
      </AppCanvas>
    );
  }
  
});

module.exports = HelperMap;
