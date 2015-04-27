'use strict';

var React = require('react');
var _ = require('underscore');

var Text = require('./statefulinput/text.jsx');
var Select = require('./statefulinput/select.jsx');

var StatefulInput = React.createClass({

  getInitialState: function() {
    return {
      currentVal: this.store.getCurrentProperty(property)
    };
  },
  
  componentWillMount: function() {
    
  },

  componentDidMount: function() {
    this.store.addChangeListener(this._onUpdate);
  },

  componentWillUnmount: function() {
    this.store.removeChangeListener(this._onUpdate);
  },

  _onUpdate: function() {
    this.store.getCurrentProperty(property);
  },

  _onChange: function() {
    actions.setProperty(property, value);
  },

  _onSave: function() {
    actions.saveProperty(property, value);
  },

  _onUndo: function() {
    actions.undoProperty(property);
  },

  render: function(){
    
    switch (this.type) {
      
      case 'text':
        <Text placeholder={this.placeholder} onChange={this._onChange} />
      break;

      case 'select':

      break;

      default: // no op

    }

    return input;
  
  }

});

module.exports = StatefulInput;