(function($) {
  $.fbgallery = function(_options, _fbsdk_config) {
    options = $.extend({
      recent_photos : 10,
      random_photos : 25,
      container     : '#photos',
      litebox       : true,
      layout        : true,
      layoutWidth   : 250,
      itemClass     : 'photo'
    }, _options);

    options.fbsdk_config = _fbsdk_config || null;

    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_UK/all.js', function(){

      if (options.fbsdk_config) {
        FB.init(options.fbsdk_config);           
      }

      var $container = $(options.container);
      
      // get the data from Facebook
      FB.api("/fql?q="+encodeURIComponent('SELECT pid, aid, src_big, link, caption from photo WHERE owner = ' + options.page_fbid + ' ORDER BY created desc'), function(resp) {
        var total_photos  = options.recent_photos + options.random_photos;
        var photos = resp.data;
        var num_photos = Math.min(total_photos, photos.length);

        for (var i = 0; i < num_photos; i++) {
          var photo;
          if (i < options.recent_photos) {
            photo = photos.splice(0, 1);
          } else {
            var randomIndex = Math.floor(Math.random()*photos.length);
            photo = photos.splice(randomIndex, 1);
          }
          
          var caption = photo[0].caption;
          // TODO: XSS issues here, find out if Facebook guarantees the results are safe
          $container.append("<div class='" + options.itemClass + "'><a href='" + photo[0]['link'] + "' title='" + caption + "'><image src='"+ photo[0].src_big + "' alt='" + caption + "' /></a></div>");
        }

        if (options.litebox) jQuery(options.container + " a").slimbox({}, function(el) {
          return [el.firstChild.src, el.firstChild.alt];
        });

        if (options.layout) {
          $container.imagesLoaded( function() {
            $container.masonry({
              columnWidth: options.layoutWidth,
              itemSelector: '.' + options.itemClass
            });
          });
        }
      });
    });
  };
})(jQuery);