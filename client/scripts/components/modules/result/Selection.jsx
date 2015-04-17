'use strict';

var React = require('react');
var _ = require('underscore');

var Selection = React.createClass({
  render:function(){
    var selectionNodes= _.map(this.props.select, function(selection, key){
      return(
        <div className='question-selection'>
          <h4 className='question-selection-item'>{key}: {selection}</h4>
        </div>
      )
    })
    return (
      <div>
        {selectionNodes}
      </div>
    )
  }
})

module.exports = Selection;
