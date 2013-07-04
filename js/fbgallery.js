(function($) {
  // Private globals
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  var htmlEscaper = /[&<>"'\/]/g;
  var options;

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
          
          // Build image up by hand to help with proper html escaping
          var caption = html_escape(photo[0].caption);
          var div = $("<div></div>");
          div.addClass(options.itemClass);

          var anchor = $("<a></a>");
          anchor.attr({
            href: photo[0]['link'],
            title: caption
          });

          var img = $("<image/>");
          img.attr({
            src: photo[0].src_big,
            alt: caption
          });

          anchor.append(img);
          div.append(anchor);
          $container.append(div);
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

  html_escape = function(string) {
    return ('' + string).replace(htmlEscaper, function(match) {
      return htmlEscapes[match];
    });
  };

})(jQuery);