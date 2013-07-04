$(document).ready(function() {
  // Setup config variables
  var recent_photos = 10;
  var random_photos = 25;
  var fbsdk_config = {
    appId: '172522912919587',
    channelUrl: '/channel.html',
    status: false,
    xfbml: false
  };
  var app_fbid = '172522912919587';
  var page_fbid = '161857717209995';
  var container = '#photos';
  var litebox = true;
  var layout = true;
  var itemClass = 'photo';

  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){

    if (fbsdk_config) {
      FB.init(fbsdk_config);           
    }

    var $container = $(container);
    
    // get the data from Facebook
    FB.api("/fql?q="+encodeURIComponent('SELECT pid, aid, src_big, link, caption from photo WHERE owner = ' + page_fbid + ' ORDER BY created desc'), function(resp) {
      var total_photos  = recent_photos + random_photos;
      var photos = resp.data;
      var num_photos = Math.min(total_photos, photos.length);

      for (var i = 0; i < num_photos; i++) {
        var photo;
        if (i < recent_photos) {
          photo = photos.splice(0, 1);
        } else {
          var randomIndex = Math.floor(Math.random()*photos.length);
          photo = photos.splice(randomIndex, 1);
        }
        
        var caption = photo[0].caption;
        // TODO: XSS issues here, find out if Facebook guarantees the results are safe
        $container.append("<div class='" + itemClass + "'><a href='" + photo[0]['link'] + "' title='" + caption + "'><image src='"+ photo[0].src_big + "' alt='" + caption + "' /></a></div>");
      }

      if (litebox) jQuery(container + " a").slimbox({}, function(el) {
        return [el.firstChild.src, el.firstChild.alt];
      });

      if (layout) {
        $container.imagesLoaded( function() {
          // Layout
          $container.masonry({
            columnWidth: 250,
            itemSelector: '.'+itemClass
          });
        });
      }
    });
  });
});
