'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var _ = require('lodash');
var rimraf = Promise.promisify(require('rimraf'));

module.exports = {

  /**
   * Utility function for creating a subdirectory in the uploads directory.
   * @param  {string} subdirectoryName The subdirectory name.
   * @return {Promise} A promise that resolves to true if the directory exists, and false if there is an error.
   */
  makeUploadDir: function(subdirectoryName){
    var path = __dirname + '/../uploads/' + subdirectoryName + '/';
    return rimraf(path).then(function(){ //this cleans out the user's upload folder so we're only keeping one at a time
      return fs.mkdirAsync(path).then(function(){
        return true; //the folder created successfully
      }).catch(function(error){
        if (error.code === 'EEXIST') return true; // ignore the error if true
        else return false;
      });//mkdir
    });//rimraf
  },

  /**
   * Utility function to move an incoming file to the uploads directory.
   * @param  {string} subdirectoryName The subdirectory to contain the file (in /uploads/)
   * @param  {string} filename The file name and extension
   * @param  {[type]} oldPath The current path of the incoming file (usually in /tmp/)
   * @return {Promise} A promise that resolves to the new full path of the file, or false in case of an error.
   */
  moveToUploads: function(subdirectoryName, filename, oldPath){
    var newPath = __dirname + '/../uploads/' + subdirectoryName + '/' + filename;
    return fs.renameAsync(oldPath, newPath).then(function(result){
      return newPath;
    }).catch(function(error){
      console.error(error);
      return false;
    });
  }

};