import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();

var portfolioPostContainer = document.getElementById('provaloca');
var button = document.getElementById('buttonW');

if (portfolioPostContainer) {

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'http://pontconsultori.net/wp-json/wp/v2/posts?categories=19');
    ourRequest.onload = function() {
      if (ourRequest.status >= 200 && ourRequest.status < 400) {
        var data = JSON.parse(ourRequest.responseText);
        console.log(data);
        createHTML(data);
      } else {
        console.log("We connected to the server, but it returned an error.");
      }
    };

    ourRequest.onerror = function() {
      console.log("Connection error");
    };
    ourRequest.send();

}



function createHTML(postsData){
    var ourHTMLString = '';
    for (var i = 0; i < postsData.length; i++) {
      ourHTMLString += '<h2>' + postsData[i].title.rendered + '</h2>'
      ourHTMLString += postsData[i].content.rendered;
    }
  portfolioPostContainer.innerHTML = ourHTMLString;
  };
