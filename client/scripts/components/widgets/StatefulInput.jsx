'use strict';

var React = require('react');
var _ = require('underscore');
var store = require('../../stores' + this.props.config.store);
var actions = requrie('../../actions' + this.props.config.actions);

var text = require('./statefulinput/text.jsx');
var select = require('./statefulinput/select.jsx');

var StatefulInput = React.createClass({

	property: this.props.config.updates,
	type: this.props.config.type,
	placeholder: this.props.config.placeholder,
	disabled: this.props.config.disabled,
	classes: this.props.config.classes,

	getInitialState: function() {
    return {
    	currentVal: store.getCurrentProperty(property)
    };
  },
	
	componentDidMount: function() {
    store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    store.removeChangeListener(this._onChange);
  },

  _onChange: function() {
  	store.getCurrentProperty(property);
  },

  _onUpdate: function() {
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
				
			break;

			case 'select':

			break;

			default: // no op

		}

		return input;
	
	}

});

module.exports = StatefulInput;