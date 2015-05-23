var React = require('react');
var mui = require('../../../node_modules/material-ui/lib/index');

var IconTable = require('../components/icon-table.jsx');
var Map = require('../components/map.jsx');
var Navbar = require('../components/navbar.jsx');
var Profile = require('../components/profile.jsx');
var { AppBar, AppCanvas, Menu, IconButton } = mui;

var ProfilePage = React.createClass({

  render: function() {

    return (
      <AppCanvas>
        <Navbar title="個人資料"/>
				<Profile/>
      </AppCanvas>
    );
  }
  
});

<<<<<<< HEAD
module.exports = HelperMap;
=======
module.exports = ProfilePage;
>>>>>>> origin/master
