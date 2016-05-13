var http = require('http');
var URL = require('url');
var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require ('./http-helpers.js');
var worker = require('../workers/htmlfetcher.js');
// var initialize = require('./initialize.js');
// require more modules/folders here!


exports.handleRequest = function (req, res) {
  var fileName = '';
  var asset = '';
  var headers = helpers.headers; 

  //callback function to be passed to serveAssests
  var handleEnd = (err, statCode, headers, contents) => {
    res.writeHead(statCode, headers);
    //log satus and err - if not err will log undefined
    console.log(statCode, err, 'ERROR LOG');
    res.end(contents);
  };

  //router: might need to put this in another module??
  //refactor to move the call to serveAssets out of the router
  var url = URL.parse(req.url).pathname;
  switch (url) {
  case '/' :
    if (req.method === 'POST') {
      var site = '';
      req.on('data', (chunk) => {
        site += chunk.toString().substr(4);
        // site += '\n';  
      }).on('end', () => {
        //if page is archived then redirect to that page
        archive.isUrlArchived(site, (err, expected) => {
          if (expected) {
            helpers.serveAssets(res, archive.paths.archivedSites + '/' + site, handleEnd);
          } else {
            archive.addUrlToList(site + '\n', handleEnd);
            helpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', handleEnd);
            //set a timeout to return to index after seeing loading page
          }
        });
      });
    
    } else {
      fileName = '/index.html';
      asset = archive.paths.siteAssets + fileName; 
      helpers.serveAssets(res, asset, handleEnd);
    }
    break;
  case '/styles.css' : 
    asset = archive.paths.siteAssets + url; 
    helpers.serveAssets(res, asset, handleEnd);
    break;
  default :
    asset = archive.paths.archivedSites + url;
    helpers.serveAssets(res, asset, handleEnd);
  }

};
