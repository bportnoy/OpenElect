'use strict';

var React = require('react/addons');

var GroupActions = require('../../../actions/GroupActions');
var GroupStore = require('../../../stores/GroupStore');

var CSVPreviewItem = React.createClass({

  render: function() {
      return (
        <tr>
          <td data-label='First Name'>{this.props.FirstName}</td>
          <td data-label='Last Name'>{this.props.LastName}</td>
          <td data-label='E-mail Address'>{this.props.EmailAddress}</td>
        </tr>
      );
  }
});

module.exports = CSVPreviewItem;