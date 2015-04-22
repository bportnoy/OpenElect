'use strict';

var React = require('react/addons');

var GroupActions = require('../../../actions/GroupActions');
var GroupStore = require('../../../stores/GroupStore');
var Select = require('react-select');
var Tooltip = require('react-tooltip');


var SetParentChild = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    GroupStore.addChangeListener(this._onChange);
  },

  componentWillMount: function(){
    GroupActions.getGroupList(true);
  },

  componentWillUnmount: function() {
    GroupStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(GroupStore.getCreateStatus());
  },

  _generateOptions: function() {
    return this.state.groups.map(function(group){
      return {value: group.id, label: group.name};
    });
  },

  _setParent: function(id) {
    console.log(id);
    this.parent = id;
  },

  _addChild: function(value, selectionArray) {
    this.children = selectionArray;
  },

  _saveParentChild: function(){
    this.setState({spinner: true});
    GroupActions.saveParentChild(this.state.group.id, this._parent,this._children, this.context.router);
  },

  _children: [],

  _parent: null,

  getInitialState: function() {
    return {spinner: false, parent: null, children: [], group: GroupStore.getCreateStatus()};
  },

  render: function() {
    console.log(this.state.group);
    var spinner = this.state.spinner ? (<i className="fa fa-circle-o-notch fa-spin spinner"></i>) : undefined;
    var parentText = 'Each group may have one parent group.\nUsers in this group will receive any polls created for its assigned parent.';
    var childText = 'Each group may have many children.\nAny polls created for this group will be served to any users in its child groups.';
      return this.state.group.member_count > 0 ? 
      (
          <div>
            <h4>{this.state.group.member_count} Members</h4>
            <h4>Set Parent Group <i className="fa fa-question-circle" data-placeholder={parentText} data-place='right'></i></h4>
            <Select
              name='children'
              placeholder='Begin typing...'
              options={this._generateOptions()}
              matchProp='label'
              onChange={this._setParent}
              multi={false}/>

            <h4>Set Child Groups <i className="fa fa-question-circle" data-placeholder={childText} data-place='right'></i></h4>
            <Select
              name='children'
              placeholder='Begin typing...'
              options={this._generateOptions()}
              matchProp='label'
              delimiter=','
              onChange={this._addChild}
              multi={true}/>
            <button onClick={this._saveParentChild}>Save Group</button><span>{spinner}</span>
            <Tooltip />
          </div>
      ) : <div><h4>Loading new group...</h4></div>;
  }
});

module.exports = SetParentChild;