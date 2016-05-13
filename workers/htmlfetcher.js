// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

//take in a site 
//call our download URL's on that target.  
var archives = require('../helpers/archive-helpers.js');
var _ = require('underscore');
var fs = require('fs');
var Promise = require ('bluebird');
Promise.promisifyAll(fs);
Promise.promisifyAll(archives);


exports.fetchHtml = () => {

  return archives.readListOfUrlsAsync().filter( url => {
    return archives.isUrlArchivedAsync(url) 
    .then( exists => !exists ); 
  })
  .each(site => archives.downloadUrlsAsync(site))
  .catch(e => console.log('ERROR', e));




};

exports.fetchHtml(); 
