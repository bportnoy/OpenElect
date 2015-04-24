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
          <div className="voteblockimage"></div>
            <h1>OpenElect</h1>
            <h2>The Open Platform for Elections</h2>
            <h3>Verifiable, accessible, and secure remote voting for organizations of any size.</h3>
            <button className="vote-button"><Link to='dashboard'>VOTING IN AN ELECTION?</Link></button>

        </div>

        <div className="content">
          <div>
            <div id="tenWidth"></div>
            <div id="fourtyWidth">
              <h2>Government & Enterprise</h2>
              <p>Take full ownership of your election processes. OpenElect works at any scale – from your small business, to the municipal, or state level.</p>
              <button><Link to='dashboard'>VIEW PLANS?</Link></button>
            </div>
            <div id="fourtyWidth">
              <img src="../../../images/congress.png" />
            </div>
          </div>

          <div>
            <div id="tenWidth"></div>
            <div id="twentyfiveWidth">
              <img src="../../../images/Safety.png" />
              <div>
                <h4>Secure</h4>
                <p>encryption technology in the voting industry</p>
              </div>
            </div>
            <div id="twentyfiveWidth">
              <img src="../../../images/Quality.png" />
              <div>
                <h4>Verifiable</h4>
                <p>You can verify your ballots easily.</p>
              </div>
            </div>
            <div id="twentyfiveWidth">
              <img src="../../../images/Partnership.png" />
              <div>
                <h4>Open Source</h4>
                <p>Our product is open source and welcome everyone to contribute.</p>
              </div>
            </div>
          </div>

          <div>
            <div id="tenWidth"></div>
            <img id="fourtyWidth" src="../../../images/Bitmap.png" />
            <div id="fourtyWidth">
              <h2>Create an Election Now, For Free</h2>
              <p>Build a publicly auditable election for your small organization today. Public elections with fewer than 100 voters will always be free.</p>
              <button><Link to='dashboard'>GET STARTED</Link></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = Landing;
