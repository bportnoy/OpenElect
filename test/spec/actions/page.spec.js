/**
*   Page Actions Spec Test
*/


'use strict';

var pageActions = require('../../../client/scripts/actions/page');

xdescribe('Page Actions', function() {

  var ReactTestUtils;
  var reactRender;

  beforeEach(function() {
    ReactTestUtils = require('react/addons').addons.TestUtils;
  });

  it('provides the "Page Actions"', function() {
    // Expect it to exist
    expect(pageActions).to.be.ok;
  });

});
