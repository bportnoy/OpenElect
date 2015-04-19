'use strict';

var React = require('react');
var _ = require('underscore');
var Selection = require('./Selection.jsx');
var rd3 = require('react-d3');
var BarChart = rd3.BarChart;

var Question = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function(){
    // this.getdata();
    return { choices: [] };
  },

  componentDidMount: function(){
    var temp = [];
    _.map(this.props.selection, function(count, select){
      temp.push({ label: select, value: count});
    });
    this.setState({ choices: temp });
  },

  render: function(){
    return (
      <div className='question-vote-count'>
        <h3>{ this.props.question }</h3>
        <Selection select={ this.props.selection }></Selection>
        <BarChart
        data={this.state.choices}
        width={600}
        height={150}
        fill={'#3182bd'}
        title= { this.props.question }/>
      </div>
    )
  },

  _onChange: function () {
    this.setState();
  }

});

module.exports = Question;
