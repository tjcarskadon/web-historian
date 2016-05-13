var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var helpers = require ('../web/http-helpers.js');
var http = require('http');
var Promise = require ('bluebird');
var rp = require('request-promise');
Promise.promisifyAll(http);

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt') //list of sites archived
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  var urls;//get list of urls -- read file 

  fs.readFile(exports.paths.list, function(err, fileContents) {
    urls = fileContents.toString().split('\n');
    if (callback) {
      callback(null, urls); //urls is an array
    }
  });
};

exports.isUrlInList = function(target, callback) {
  var urlInExist = (urls) => {
    callback( _(urls).contains(target) );
  };

  exports.readListOfUrls(urlInExist);

};

exports.addUrlToList = function(input, callback) {
  fs.appendFile(exports.paths.list, input, (err, data) => {
    if (!err) {
      callback(302, helpers.headers, null, err);
    } else {
      callback(404, helpers.headers, null, err);
    }
  });
};

exports.isUrlArchived = function(target, callback) {
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    callback(null, _(files).contains(target), target); 

    //_(files).filter( (file) => _(files).contains(file));


  });


};

exports.downloadUrls = function(target) {

  //for rp we have to pass in a uri
  //the target is just the 

  var options = {
    protocol:'http',
    host: target,
    path: '/',
    port: 80,
    method: 'GET'
  };

rp('http://' + target).then(htmlString => 
  fs.writeFile(exports.paths.archivedSites + '/' + target, htmlString))
  .catch(e => null);

/**************WORKS BUT NOT PROMISY******************/
  // http.get(options, (res) => {
  //   res.on('data', (chunk) => {
  //     fs.writeFile(exports.paths.archivedSites + '/' + target, chunk.toString());
  //   }).on('error', (err) => {
  //     console.log('ERROR:', err);
  //   });
  // });



};
