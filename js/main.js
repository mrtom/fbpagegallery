$(document).ready(function() {
  // Setup config variables
  var options = {
    recent_photos: 10,
    random_photos: 25,
    page_fbid: '161857717209995',
    container: '#photos',
    litebox: true,
    layout: true,
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
