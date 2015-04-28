'use strict';

var React = require('react');

var GroupActions = require('../../../actions/GroupActions');
var GroupStore = require('../../../stores/GroupStore');
var UserItem = require('./UserItem.jsx');

var ReactPaginate = require('react-paginate');

var UserList = React.createClass({

  getInitialState: function() {
    var perPage = 20;
    var initialDisplay = [];
    for (var i = 0; i < this.props.users.length && i < perPage; i++){
      initialDisplay.push(this.props.users[i]);
    }
    return {
      offset: 0,
      pages: this.props.users.length/perPage,
      currentDisplay: initialDisplay,
      perPage: perPage,
      perPageInput: perPage,
      previousSelection: {selected: 0}
    };
  },

  handlePageClick: function(data, newPerPage){
    var newPage = data.selected;
    var perPage = newPerPage || this.state.perPage;
    var newDisplay = [];
    for (var i = newPage * perPage; i < this.props.users.length && newDisplay.length < perPage; i++){
      newDisplay.push(this.props.users[i]);
    }
    this.setState({currentDisplay: newDisplay, previousSelection: data});
  },

  repaginate: function(e){
    e.preventDefault();
    this.setState({perPageInput: e.target.value});
    var newPerPage = parseInt(e.target.value);
    if (!isNaN(newPerPage)){
      this.setState({perPage: newPerPage});
      this.handlePageClick(this.state.previousSelection, newPerPage);
    }
  },

  removeUser: function(user){
    GroupActions.removeUser(user.id, this.props.group);
  },

  render: function() {
    var users = this.state.currentDisplay.map(function(user){
    return <UserItem key={user.id}
                              FirstName={user.first_name}
                              LastName={user.last_name}
                              EmailAddress={user.email}
                              controlText='Remove'
                              controlAction={this.removeUser.bind(this,user)}/>;
  }.bind(this));

  return <article className="container">
      <table className='striped bordered responsive-table'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail Address</th>
          </tr>
        </thead>
        <tbody>
          {users}
        </tbody>
      </table>
      <ReactPaginate previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={<li className="break"><a href="">...</a></li>}
                            pageNum={this.state.pages} // number to display
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            clickCallback={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClass={"active"} />
      <h4>Users per page:</h4><input type='text' value={this.state.perPageInput} onChange={this.repaginate}/>
  </article>;
  },

  onSelect: function(page) {
      var pagination = this.state.pagination || {};

      pagination.page = page;

      this.setState({
          pagination: pagination
      });
  },

  onPerPage: function (e) {
      var pagination = this.state.pagination || {};

      pagination.perPage = parseInt(event.target.value, 10);

      this.setState({
          pagination: pagination
      });
  },

});

module.exports = UserList;
