var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

// Here we define all our material-ui ReactComponents.
var Layout = require('./pages/layout.jsx');
var LandingPage = require('./pages/landing-page.jsx');
var HelpListPage = require('./pages/help-list-page.jsx');
var HelpMapPage = require('./pages/help-map-page.jsx');
var GetHelpPage = require('./pages/get-help-page.jsx');
var ProfilePage = require('./pages/profile-page.jsx');
var HelpContentPage = require('./pages/help-content-page.jsx');

var AppRoutes = (
  <Route name="root" path="/" handler={Layout}>
    <Route name="landing" handler={LandingPage} />
    <Route name="help-list" handler={HelpListPage} />
    <Route name="help-map" handler={HelpMapPage} />
    <Route name="get-help" handler={GetHelpPage} />
    <Route name="profile" handler={ProfilePage} />
    <Route name="help-content" path="/help-content/:contentId" handler={HelpContentPage} />
    <DefaultRoute handler={LandingPage}/>
  </Route>
);

module.exports = AppRoutes;
