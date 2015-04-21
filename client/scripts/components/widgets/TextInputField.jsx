'use strict';

var React = require('react/addons');
var Formsy = require('formsy-react');

var TextInputField = React.createClass({

  mixins: [Formsy.Mixin],

  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },

  render: function () {
    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;
    var errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <input type="text" onChange={this.changeValue} value={this.getValue()} placeholder={this.placeholderText}/>
        <div className='error-message'><span>{errorMessage}</span></div>
      </div>
    );
  }
});

module.exports = TextInputField;
