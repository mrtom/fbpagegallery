$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.init({
      appId: '172522912919587',
      channelUrl: '/channel.html',
      status: false,
      xfbml: false
    });     

    var $container = $('#photos');
    
    // get the data from Facebook
    FB.api("/fql?q="+encodeURIComponent('SELECT pid, aid, src_big, link, caption from photo WHERE owner = 161857717209995 ORDER BY created desc'), function(resp) {
      var photos = resp.data;
      var numPhotos = Math.min(25, photos.length);

      // Choose 25 photos randomly, and add to page
      for (var i = 0; i < numPhotos; i++) {
        var randomIndex = Math.floor(Math.random()*photos.length);
        var photo = photos.splice(randomIndex, 1);
        var caption = photo[0].caption;
        var url = photo[0].src_big;

        $container.append("<div class='photo'><a href='" + url + "' title='" + caption + "'><image src='"+ url +"' alt='" + caption + "' /></a></div>");
      }

      jQuery("#photos a").slimbox();

      $container.imagesLoaded( function() {
        // Layout
        $container.masonry({
          columnWidth: 250,
          itemSelector: '.photo'
        });
      });
    });
  });
});
