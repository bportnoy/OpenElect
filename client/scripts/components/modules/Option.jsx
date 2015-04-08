'use strict';

var React = require('react');


var Option = React.createClass({
  render: function() {

    return (
      <div className='option'>
        <tr className='candidate'>
          <td><input type='checkbox' className='chad' id={this.props.name} /></td>
          <td><label className='name' htmlFor={this.props.name}>{this.props.name}</label></td>
        </tr>
        <tr className='candidate-info'>
          <td></td>
          <td><span className='party'>{this.props.party}</span></td>
          <td><span className='statement'>{this.props.statement}</span></td>
        </tr>
      </div>
    );
  }

});

module.exports = Option;
