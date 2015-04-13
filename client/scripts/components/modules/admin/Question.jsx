'use strict';

var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var axios = require('axios');

var Question = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  addAnotherOption: function() {
    this.setState({optionCount: this.state.optionCount+1});
  },

  getInitialState: function (){
    //the linkstate to a number key is hacky as hell and we should fix it some day.
    return {optionCount: 2};
  },

  saveQuestion: function() {
    var options = [];

    for (var key in this.state){
      if (key !== 'optionCount' && key !== 'pollId' && key !== 'questionName'){ //so hacky :(
        options.push({
          name: this.state[key],
          id: key
          //todo: other fields
        });
      }
    }

    if (this.props.pollId === undefined){
      console.error("Please save your poll before attempting to add options");
    }
    else {
      console.log(this.props.pollId);
      axios.post('/api/v1/questions/create', {question: {
        name: this.state.questionName,
        // description: this.state.questionDescription,
        poll_id: this.props.pollId,
        options: options
      }}).then(function(response){
        //todo: kill the spinner
        console.log('question saved with id: ' + response.data.id);
      }.bind(this)).catch(function(response){
        console.error(response);
      });
    }
  },


  render: function() {
    var options = [];
    for (var i = 1; i <= this.state.optionCount; i++){
      options.push(
        <div>
        <h3>Option {i}</h3>
        <input type='text' placeholder='' valueLink={this.linkState(i)}/>
        </div>);
    }
    return (
      <div>
        <h1>Question {this.props.number}</h1>
        <input type='text' placeholder='' ref='question-1' valueLink={this.linkState('questionName')} />
        <hr />
        <div>{ options }</div>
        <button onClick={this.saveQuestion}>Save Question</button>
        <button onClick={this.addAnotherOption}>Add another answer option</button>
      </div>
    );
  }
});

module.exports = Question;
