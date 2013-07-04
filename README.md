fbpagegallery
=============

A simple gallery that pulls photos from your Facebook Page

Overview
--------
fbpagegallery is a super simple jQuery plugin that generates a gallery by pulling in public photos from your Facebook Page and inserts them into a container element.

You can set the number of photos you want to include, and choose a combination of most recent and random - for example you can pull in the 10 most recent photos then 20 random photos. It doesn't support paging.

fbpagegallery optionally uses Masonry (http://masonry.desandro.com/) for laying out your photos nicely, and slimbox2 (http://www.digitalia.be/software/slimbox2) for a nice lightbox style effect.

How to Use
----------
1. Add a container element

        <div id="#photos"></div>

1. Include `fbPageGallery.js` in your HTML file. Include `masonry.js` & `imagesLoaded` if using Masonry. Include `slimbox2.js` if using Slimbox.
 
        <script src="js/vendor/masonry.js"></script>
        <script src="js/vendor/imagesloaded.js"></script>
        <script src="js/vendor/slimbox2.js"></script>
        <script src="js/fbPageGallery.js"></script>
  
1. Initialise the fbPageGallery, setting appropriate options. The fbsdk_config is optional, but you must include this if you haven't already setup the Facebook JS SDK.

        $(document).ready(function() {
          // Setup config variables
          var options = {
            page_fbid: '161857717209995',
            container: '#photos',
            layoutWidth: 250,
            itemClass: 'photo' 
          };
          var fbsdk_config = {
            appId: '172522912919587',
            channelUrl: '/channel.html',
            status: false,
            xfbml: false
          };
          $.fbPageGallery(options, fbsdk_config);  
        });

1. Add/modify the CSS for Masonry and include `slimbox2.css` for Slimbox, as appropriate.

Demo
----

Simply clone the repo into your webserver of choice and open in a browser, or go visit http://telliott.net/facebookExamples/fbpagegallery/
