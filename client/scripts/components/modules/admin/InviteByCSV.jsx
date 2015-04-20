'use strict';

var React = require('react/addons');
var Dropzone = require('dropzone');

var GroupActions = require('../../../actions/GroupActions');
var GroupStore = require('../../../stores/GroupStore');
var CSVPreview = require('./CSVPreview.jsx');

var firstRowHolding, preview;

var InviteByCSV = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  componentDidMount: function() {
    GroupStore.addChangeListener(this._onChange);

   // disable dropzone autodiscover
    Dropzone.autoDiscover = false;

   // istantiate dropzone
    var myDropzone = new Dropzone(React.findDOMNode(this.refs.dropzone), {
        url : '/api/v1/groups/csv',
        maxFiles: 1,
        maxFileSize: 50,
        acceptedFiles: '.csv',
        dictDefaultMessage: 'Drop your CSV here, or click to select a file (Max 50MB).',
    });

    //add success event listener
    myDropzone.on('success', function(file, response){
      this.setState({preview: response.csvPreview, filePath: response.filePath});
    }.bind(this));
  },

  componentWillUnmount: function() {
    GroupStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var newFirstRowStatus = GroupStore.getFirstRowStatus();
    this.setState({removeFirst: newFirstRowStatus});
    if (newFirstRowStatus) {
      firstRowHolding = this.state.preview[0];
      this.setState({preview: this.state.preview.slice(1)});
    } else {
      var restoredPreview = this.state.preview.slice();
      restoredPreview.unshift(firstRowHolding);
      this.setState({preview: restoredPreview});
    }
  },

  onDrop: function(files) {
    GroupActions.uploadCSV(files[0]);
  },

  removeFirst: function(files) {
    GroupActions.toggleFirstRowStatus();
  },

  getInitialState: function() {
    return {groupName: '', preview: undefined, removeFirst: GroupStore.getFirstRowStatus()};
  },

  render: function() {
    var drop = this.state.preview ? undefined :
    ( <div className='dz'>
        <form ref='dropzone' action='/api/v1/groups/csv' className='dropzone'/>
      </div>);
    var preview = this.state.preview ? (<CSVPreview response={this.state.preview} 
                                                    filePath={this.state.filePath}/>) : undefined;

    var controls = this.state.preview ? (<div>
                                            <label htmlFor='removeFirst'>Remove First Row: </label>
                                            <input type='checkbox' name='removeFirst'
                                              value={this.state.removeFirst}
                                              onChange={this.removeFirst}/>
                                            </div>) : undefined;

      return (<div>
                <div>{drop}</div>
                <div>{controls}</div>
                <div>{preview}</div>
              </div>
      );
  }
});

module.exports = InviteByCSV;