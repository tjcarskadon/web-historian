var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.extensions = {
  '.css': 'text/css', 
  '.js': 'text/javascript'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  var ext = path.extname(asset); //.css

  exports.headers['Content-Type'] = exports.extensions[ext] || 'text/html';
  
  fs.readFile(asset, function(err, fileContents) {
    if (!err) {
      callback(err, 200, exports.headers, fileContents);
    } else {
      callback(err, 404, exports.headers, fileContents);
    }
  });

};

// As you progress, keep thinking about what helper functions you can put here!
