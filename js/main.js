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
      var size = Math.min(25, photos.length);

      for (var i = 0; i < size; i++) {
        $container.append("<div class='photo'><image src='"+photos[i].src_big+"'' /></div>");
      }

      $container.imagesLoaded( function() {
        console.log("Loading masonary via jquery");
        $container.masonry({
          columnWidth: 250,
          itemSelector: '.photo'
        });
      });
    });
  });
});
