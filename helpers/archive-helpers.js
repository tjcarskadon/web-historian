var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var headers = require ('../web/http-helpers.js').headers;


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

exports.readListOfUrls = function() {
};

exports.isUrlInList = function() {
};

exports.addUrlToList = function(res, asset, input, callback) {
  fs.appendFile(asset, input, (err, data) => {
    if (!err) {
      callback(302, headers, null, err);
    } else {
      callback(404, headers, null, err);
    }
  });
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};
