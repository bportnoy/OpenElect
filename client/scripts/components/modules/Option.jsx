'use strict';

var React = require('react');
var BallotActions = require('../../actions/BallotActions');
var BallotStore = require('../../stores/BallotStore');



var Option = React.createClass({

  getInitialState: function() {
    return {selected: !!BallotStore.getSelected(this.props.questionId, this.props.id)};
  },

  componentDidMount: function() {
    BallotStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    BallotStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({selected: !!BallotStore.getSelected(this.props.questionId, this.props.id)});
  },

  makeSelection: function() {
    if (!this.state.selected)
      BallotActions.select(this.props.questionId, this.props.id);

    else BallotActions.deselect(this.props.questionId, this.props.id);
  },

  render: function() {

    return (
      <div className='option'>
        <tr className='candidate'>
          <td><input type='checkbox' checked={this.state.selected} onChange={this.makeSelection} 
                className='chad' id={this.props.name} /></td>
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