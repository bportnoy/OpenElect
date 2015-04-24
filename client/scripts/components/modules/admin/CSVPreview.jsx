'use strict';

var React = require('react/addons');

var GroupActions = require('../../../actions/GroupActions');
var GroupStore = require('../../../stores/GroupStore');

var CSVPreviewItem = require('./CSVPreviewItem.jsx');

var CSVPreview = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  componentDidMount: function() {
    GroupStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    GroupStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({spinner: GroupStore.getCSVProcessStatus()});
  },

  _ProcessCSV: function() {
    this.setState({spinner: true});
    GroupActions.processCSV(this.props.filePath);
    GroupActions.togglePCBlockStatus();
  },

  _TryAgain: function(){
    GroupActions.toggleInviteBlockStatus();
    GroupActions.toggleInviteButtonStatus();
  },

  getInitialState: function() {
    return {spinner: false};
  },

  render: function() {
    var spinner = this.state.spinner ? (<i className="fa fa-circle-o-notch fa-spin spinner"></i>) : undefined;
    var rows = this.props.response.map(function(row){
      if (row) return <CSVPreviewItem key={row.EmailAddress}
                                FirstName={row.FirstName}
                                LastName={row.LastName}
                                EmailAddress={row.EmailAddress}/>;
    });

      return (
          <div>
          <h4>Please review this preview of your uploaded data:</h4>
            <table className='striped bordered responsive-table'>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>E-mail Address</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
            <button onClick={this._TryAgain}>Try New Upload</button>
            <button onClick={this._ProcessCSV}>Looks Good</button><div className='spinner'>{spinner}</div>
          </div>

      );
  }
});

module.exports = CSVPreview;