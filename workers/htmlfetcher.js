// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

//take in a site 
//call our download URL's on that target.  
var archives = require('../helpers/archive-helpers.js');
var _ = require('underscore');

exports.fetchHtml = () => {

  console.log('I am fetching leave me the f alone');
  var arrayofUrls = [];

  var populateArray = (urls) => {
    arrayofUrls = urls;
    arrayofUrls.forEach( (url) => {
      if (url.length) {
        archives.isUrlArchived(url, fetcher);
      }
    });
  };

  archives.readListOfUrls(populateArray);

  var fetcher = (exists, url) => {
    if (!exists) {
      console.log('this is where we need a target ', url);
      archives.downloadUrls(url);
    } else {
      console.log('we passed the stupid test');
    }
  };



};

//check our list of sites (periodically?)
//compare it to our curerntly loaded list of URLs
  //if the sites in our list aren't archived
    //go fetch

  // 