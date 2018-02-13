import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';

var portfolioPostContainer = document.getElementById('lloopp');
var button = document.getElementById('buttonW');

if (portfolioPostContainer) {

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'http://pont.kualalumpurstudio.com/wp-json/wp/v2/media?parent=4');
    ourRequest.onload = function() {
      if (ourRequest.status >= 200 && ourRequest.status < 400) {
        var data = JSON.parse(ourRequest.responseText);
        console.log(data);
        // portfolioPostContainer.innerHTML =  'hola' + data.title.rendered + data.content.rendered;
            var ourHTMLString = '';
        for (var i = 0; i < data.length; i++) {
          var active = '';
          var style = '';
          if (i == 0) {
            active = 'active';
            style = 'style:"position: relative; top: 0px; display: block;"';
          }
          ourHTMLString+=
          '<li class="' + active + ' orbit-slide" data-slide="0"' + style +'>' +
          '<figure class="orbit-figure">' +
            '<img class="orbit-image" src="' + data[i].media_details.sizes.medium.source_url + '" alt="' + data[i].title.rendered +'">' +
            '<p class="text-right">' + languageText('ca', data[i].caption.rendered) + '</p>' +
          '</figure>' +
          '</li>';
          console.log(ourHTMLString);

        };
        $(".orbit-figure").css("background-color","#BCFFB9");

          portfolioPostContainer.innerHTML = ourHTMLString;
          Foundation.reInit('orbit');
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
if ($( ".lang .es" ).hasClass( "active" )) {
  console.log('lang active');
} else {
  console.log('lang disabled');
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
  }
