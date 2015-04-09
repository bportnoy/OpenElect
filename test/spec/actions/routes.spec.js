/**
*   Router Actions Spec Test
*/


'use strict';

var routerActions = require('../../../client/scripts/actions/routes');

xdescribe('Router Actions', function() {

  var ReactTestUtils;
  var reactRender;

  beforeEach(function() {
    ReactTestUtils = require('react/addons').addons.TestUtils;
  });

  it('provides the "Router Actions"', function() {
    // Expect it to exist
    expect(routerActions).to.be.ok;
  });

});
