var React = require('react');
var mui = require('../../../node_modules/material-ui/lib/index');

var { AppBar, AppCanvas, Menu, IconButton } = mui;
var Navigation = require('react-router').Navigation;

var Landing = React.createClass({

  mixins: [Navigation],
  getInitialState: function() {
    return {
      citizen: 0 
    };
  },
  shine: function(count) {
    var self = this;
    self.refs.circle.getDOMNode().classList.add('shine');
    var shiner = setTimeout(function() {
      self.refs.circle.getDOMNode().classList.remove('shine');
      setTimeout(function() {
        self.shine(count - 1);
      }, 600);
    }, 400);
  },
  componentDidMount: function() {
    console.log('mount');
    var self = this;
    var counter = setInterval(function() {
      self.setState({citizen: self.state.citizen + 3});
      if (self.state.citizen > 650) {
        clearInterval(counter);
        counter = setInterval(function() {
          self.setState({citizen: self.state.citizen + 2});
          if (self.state.citizen > 685) {
            clearInterval(counter);
            counter = setInterval(function() {
              self.setState({citizen: self.state.citizen + 1});
              if (self.state.citizen == 689) {
                clearInterval(counter);
                self.shine(10);
              }
            }, 300);
          }
        }, 40);
      }
    }, 2);
  },
  render: function() {

    return (
      <AppCanvas>
        <div className="background" />
        <div className="help-others-btn" ref="circle" onTouchTap={() => this.changeRoute('help-list')}>
          <div className="help-num">{ this.state.citizen }</div>
          <div className="postfix">位市民需要協助</div>
        </div>
        <div className="instruction">
          <span className="fa fa-arrow-up" />
          <span>立刻去幫助他們吧！</span>
        </div>
        <div className="get-help-btn" onTouchTap={() => this.changeRoute('get-help')}>
          我需要超人的協助！
        </div>
      </AppCanvas>
    );
  },
  changeRoute: function(new_route){
    this.transitionTo(new_route);
  }
  
});

module.exports = Landing;