'use strict';

// dependencies
var React = require('react/addons');
var Link = require('react-router').Link;

var Landing = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return null;
  },

  // Currently use Link to redirect to dashboard
  // All the link needs to be updated later
  render: function() {
    return(
      <div className="voteblock">

        <div className="voteblockbg">
          <div className="voteblockicon"></div>
          <h1>OpenElect</h1>
          <h2>The Open Platform for Elections</h2>
          <h3>Verifiable, accessible, and secure remote voting for organizations of any size.</h3>
          <button className="vote-now"><Link to='dashboard'>VOTING IN AN ELECTION?</Link></button>
        </div>

        <div className="voteblockimage">
          <h1>Welcome</h1>
          <h3>
           Elections as easy as everything else on the Web.
          </h3>
        </div>

        <div className="content container">
          <div className="row">
                <h1>Vote with us in confidence</h1>

                <div className="feature-item">
                  <img src="../../../images/Safety.png" />
                  <div>
                    <h2>Secure</h2>
                    <h3>Encryption technology in the voting industry</h3>
                  </div>
                </div>

                <div className="feature-item">
                  <img src="../../../images/Quality.png" />
                  <div>
                    <h2>Verifiable</h2>
                    <h3>You can verify your ballots easily.</h3>
                  </div>
                </div>

                <div className="feature-item">
                  <img src="../../../images/Partnership.png" />
                  <div>
                    <h2>Open Source</h2>
                    <h3>Our product is open source and welcome everyone to contribute.</h3>
                  </div>
                </div>
          </div>
        </div>

        <div className="create-election-cta">
          <h1>Create an election now, for free</h1>
          <div className="create-ballot-message">
            <h2>Build a publicly auditable election for your small organization today. Public elections with fewer than 100 voters will always be free.</h2>
            <button className="create-ballot"><Link to='dashboard'>CREATE AN ELECTION</Link></button>
          </div>
        </div>

      </div>
    );
  }
});


module.exports = Landing;
