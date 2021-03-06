var React = require('react');
var mui = require('../../../node_modules/material-ui/lib/index');

var IconTable = require('../components/icon-table.jsx');
var Map = require('../components/map.jsx');
var Navbar = require('../components/navbar.jsx');
var { AppBar, AppCanvas, Menu, IconButton } = mui;

var HelperList = React.createClass({

  render: function() {

    return (
      <AppCanvas>
        <Navbar title="市民困難列表" rightButton="location" />
        <IconTable/>
      </AppCanvas>
    );
  }
  
});

module.exports = HelperList;



