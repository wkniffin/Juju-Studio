Meteor.startup(function() {
  GoogleMaps.load();
});

Template.map.onCreated(function() {
  this.autorun(() => {
    this.subscribe('Sounds');
    //this.subscribe('SoundBuffers');
  });
  GoogleMaps.ready('map', function(map) {
    var sounds = Sounds.find();
    //arrays to find matching lat or lnges with current lat and lng
    var lat = [];
    var lng = [];
    // array to store infoWindows to close later
    var windows = [];
    Sounds.find().observe({
      added: function(doc) {
        var this_lat = parseFloat(doc.lat);
        var this_lng = parseFloat(doc.lng);
        // move pins that are at the exact same location off by a random offset
        if(lat.length > 1 && lat.indexOf(this_lat) >= 0 && lng.indexOf(this_lng) >= 0) {
          var offset = (Random.fraction())*0.00010;
          var rand = Random.fraction();
          if(rand < .25) {
            this_lng+=offset;
          } else if (rand < .5 && rand >= .25) {
            this_lat-+offset;
          } else if (rand < .75 && rand >= .5) {
            this_lng-=offset;
          } else {
            this_lat+=offset;
          }
        }
        lat.push(parseFloat(doc.lat));
        lng.push(parseFloat(doc.lng));

        var the_location = new google.maps.LatLng(this_lat, this_lng);
        var markerContent = '<div class="marker-content '+doc._id+'">'+
        "<div class='sound-name'>"+
        '<h1>'+doc.name+'</h1>'+
        '</div>'+
        '<div class="sound-user">'+
        '<h3>discovered by: '+doc.user+'</h3>'+
        '</div>'+
        '<div class="sound-comment">'+
        '<p>uploader comment: '+doc.comment+'</p>'+
        '</div>'+
        '<div class="play">'+
        "<button type='button' class='btn btn-primary map-window-play "+doc._id+"'>play</button>"+
        '</div>'+
        '<div class="download">'+
        "<a href='"+doc.url+"' download='"+doc.name+"'>download</a>"+
        '</div>'+
        '</div>';
        var infowindow = new google.maps.InfoWindow({
          content: markerContent
        });
        windows.push(infowindow);
        var marker = new google.maps.Marker({
          position: the_location,
          title: doc.name[0],
          icon: 'https://s3.amazonaws.com/juju-sound/juju-pin-1.png'
        });
        marker.addListener('click', function() {
          // close all other infoWindows
          windows.forEach(function(window) {
            window.close();
          });
          infowindow.open(map.instance, marker);
          // set session values for comments section
          Session.set('soundId', doc._id);
          Session.set('markerOpened', true);
          Session.set('oldSoundId', doc._id);
        });
        infowindow.addListener('closeclick', function(event) {
          Session.set('soundId', '');
          Session.set('oldSoundId', '');
        });
        marker.setMap(map.instance);
      }
    });
  });
});

Template.map.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      // set map startup location
      var location = {'lat': 44.479981, 'lng': -73.197155};
      return {
        center: new google.maps.LatLng(location.lat, location.lng),
        zoom: 8
      };
    }
  }
});
Template.map.events({
  'click .map-window-play': function(event) {
    event.preventDefault();
    // get the soundId from the map
    var the_id = event.target.classList[3];
    //
    // // get the document from SoundBuffers
    // var the_sound = SoundBuffers.findOne({soundId: the_id});
    // // store the binary data
    // var originalBuffer = the_sound.buffer;
    // // create an arraybuffer of length originalBuffer.byteLength
    // var finalBuffer = new ArrayBuffer(originalBuffer.byteLength);
    // // do some binary type manipulation
    // new Uint8Array(finalBuffer).set(new Uint8Array(originalBuffer));
    //
    // // load data to play
    // var source = context.createBufferSource();
    // context.decodeAudioData(finalBuffer, function(buffer) {
    //   source.buffer = buffer;
    //   source.connect(context.destination);
    // });
    // source.start(0);
    function playSound(url) {
      var a = new Audio(url);
      a.play();
    }

    playSound(Sounds.findOne({_id: the_id}).url);
  },
  'click .map-window-download': function(event) {
    event.preventDefault();

    var the_id = event.target.classList[3];


  }
});
