import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();

//variables
var pontslider = document.getElementById('pontslider');
var metode = document.getElementById('metode');
var lang = document.documentElement.lang;

//crida functions
prova( pontslider, 'media?parent=4' , 'slider')
prova( metode, 'pages/14' , 'post')

//jquery
$('.lang .' + lang).addClass("active");

// functions
function prova( itemID, request, tipo ){
if (itemID) {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'http://pont.kualalumpurstudio.com/wp-json/wp/v2/' + request);
    ourRequest.onload = function() {
      if (ourRequest.status >= 200 && ourRequest.status < 400) {
        var data = JSON.parse(ourRequest.responseText);
        if (tipo == 'slider') {
          createslider(data, itemID);
        } else if (tipo == 'post') {
          createpost(data, itemID);
        }

      } else {
        console.log("We connected to the server, but it returned an error.");
      }
    };
    ourRequest.onerror = function() {
      console.log("Connection error");
    };
    ourRequest.send();
}
}

function createpost(postData, pItemID){
  console.log(postData);
  let ourHTMLString = '';
  ourHTMLString = '<h1>' +  languageText(lang, postData.title.rendered) + '</h1>' + '<p>' + languageText(lang,postData.content.rendered) + '</p>';
  pItemID.innerHTML = ourHTMLString;
};

function createslider (postsData, pItemID){
  let ourHTMLString = '';
  for (var i = 0; i < postsData.length; i++) {
    var active = '';
    var style = '';
    if (i == 0) {
      active = 'active';
      style = 'style:"position: relative; top: 0px; display: block;"';
    }
    ourHTMLString+=
    '<li class="' + active + ' orbit-slide" data-slide="0"' + style +'>' +
    '<figure class="orbit-figure">' +
      '<img class="orbit-image" src="' + postsData[i].media_details.sizes.medium.source_url + '" alt="' + postsData[i].title.rendered +'">' +
      '<p class="text-right">' + languageText(lang, postsData[i].caption.rendered) + '</p>' +
    '</figure>' +
    '</li>';
  };
  pItemID.innerHTML = ourHTMLString;
  Foundation.reInit('orbit');
  };


  function languageText(lang, text) {
    let esX = text.search("<:es>");
    let caX = text.search("<:ca>");
    let EndTagX;

      if ( lang == 'ca') {
        // text CA
        if (caX < esX) {
        text =text.slice(caX + 5, esX);
        } else {
          text = text.slice(caX + 5);
        }
      } else {
        //text no CA
        if (caX > esX) {
        text = text.slice(esX + 5, caX) ;
        } else {
          text = text.slice(esX + 5);
        }
      };

    EndTagX = text.search("</")
    text = text.slice('EndTagX');
    return text;
  };
