var converter = new Showdown.converter();

var Election = React.createClass({
    render: function() {
        return (
            <div className="election">
                <div className="electionOverview">
                    <h2 className="electionTitle">{ this.props.name }</h2>
                    <p className="electionDescription">{ this.props.description }</p>
                    <button type="button" className="btn">VIEW ELECTION POLLS</button>
                </div>
                <div className="electionDetails">
                    <div className="electionAcceptingVotesStatus"></div> // display the status of election
                    // <div className="electionStatusBar"></div> // display status metric of voter participation
                    <div className="electionPrivacyStrategy">{ this.props.privacy_strategy }</div>
                    <div className="electionIsLocked">Locked: { this.props.locked }</div>
                    <div className="electionIsTimed">Timed: { this.props.timed }</div>
                    <div className="electionIsAcceptingVotes">Accepting Votes: { this.props.accepting_votes }</div>
                    <div className="electionStart">Start: { this.props.start }</div>
                    <div className="electionEnd">End: { this.props.end }</div>
                    // <div className="electionIsLocked"></div> //toggle display of lock or edit link (lock image)
                    // <div className="electionIsLocked"><a href="#">EDIT</a></div> //toggle display of lock or edit link (edit link)
                </div>
            </div>
        );
    }
});

var ElectionBox = React.createClass({
  loadElectionsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleElectionSubmit: function(election) {
    var elections = this.state.data;
    elections.push(election);
    this.setState({data: elections}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: election,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadElectionsFromServer();
    setInterval(this.loadElectionsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="electionBox">
        <h1>Elections</h1>
        <ElectionList data={this.state.data} />
        <ElectionForm onElectionSubmit={this.handleElectionSubmit} />
      </div>
    );
  }
});

var ElectionList = React.createClass({
  render: function() {
    var electionNodes = this.props.data.map(function(election, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Election name={election.name} key={index}>
          {election.description}
        </Election>
      );
    });
    return (
      <div className="electionList">
        {electionNodes}
      </div>
    );
  }
});

var ElectionForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var name = React.findDOMNode(this.refs.name).value.trim();
        var description = React.findDOMNode(this.refs.description).value.trim();
        if (!name || !description) {
          return;
        }
        this.props.onElectionSubmit({name: name, description: description});
    },
    render: function() {
        return (
            <form className="electionForm" onSubmit={this.handleSubmit}>
                <h1>Create New Election</h1>
                <h3>Name</h3>
                    <input type="text" placeholder="Enter a name for the election (i.e. Clark County 2015 Election)" ref="name" />
                <h3>Description</h3>
                    <input type="text" placeholder="Enter a detailed description, 1000 characters max" ref="description" />
                <h3>URL handle</h3>
                    <input type="text" placeholder="Enter a URL handle with no spaces (i.e. http://municipal.gov/clark-county-2015-election)" ref="url_handle" />

                <h3>Election date</h3>
                    <h5>Start date</h5>
                        <input type="date" ref="start" />
                    <h5>End date</h5>
                        <input type="date" ref="end" />
                <h3>Ballot Privacy</h3>
                    <input type="radio" name="privacy_strategy" value="open_ballot" checked />Public ballot, public voter participation<br />
                    <input type="radio" name="privacy_strategy" value="secret_ballot_public_voter" />Private ballot, public voter participation<br />
                    <input type="radio" name="privacy_strategy" value="secret_ballot_anonymized_voter" />Private ballot, anonymized voter participation
                <h3>Options</h3>
                    <input type="checkbox" name="randomize_answer_order" value="true" />Randomize answer choice order
                <h3>Security</h3>
                    <input type="checkbox" name="two_factor_auth" value="true" />Enable Two-Factor Authentication
                <a href="#">CANCEL</a>
                <input type="submit" action="Post" value="PROCEED" />
            </form>
        );
    }
});

React.render(
    <ElectionBox url="elections.json" />,
    document.getElementById("election-content")
);
