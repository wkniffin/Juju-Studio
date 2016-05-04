Meteor.startup(function() {
  GoogleMaps.load();
});

Template.map.onCreated(function() {
  this.autorun(() => {
    this.subscribe('Sounds');
    this.subscribe('SoundBuffers');
  });
  GoogleMaps.ready('map', function(map) {
    var sounds = Sounds.find();
    var lat = [];
    var lng = []; //array to find matching lat or lnges with current lat and lng

    Sounds.find().observe({
      added: function(doc) {
        var this_lat = parseFloat(doc.lat);
        var this_lng = parseFloat(doc.lng);
        if(lat.length > 1 && lat.indexOf(this_lat) >= 0 && lng.indexOf(this_lng) >= 0) {
          //console.log('hey ');
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
        '<div class="comments">'+
        "<button type='button' class='btn btn-primary map-window-comments "+doc._id+"'>comments</button>"+
        '</div>'+
        '</div>';
        var infowindow = new google.maps.InfoWindow({
          content: markerContent
        });
        var marker = new google.maps.Marker({
          position: the_location,
          title: doc.name[0],
          icon: 'https://s3.amazonaws.com/juju-sound/jujupin.png'
        });
        marker.addListener('click', function() {
          infowindow.open(map.instance, marker);
        });
        infowindow.addListener('click', function(event) {
          //console.log(event.target);
        });
        marker.setMap(map.instance);
      }
    });
  });
});

Template.map.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
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
    var the_id = event.target.classList[3];

    var the_sound = SoundBuffers.findOne({soundId: the_id});

    var originalBuffer = the_sound.buffer;
    var finalBuffer = new ArrayBuffer(originalBuffer.byteLength);
    new Uint8Array(finalBuffer).set(new Uint8Array(originalBuffer));

    // var AudioContext = AudioContext || webkitAudioContext || mozAudioContext;
    // var context = new AudioContext();
    var source = context.createBufferSource();

    context.decodeAudioData(finalBuffer, function(buffer) {
      source.buffer = buffer;
      source.connect(context.destination);
    });

    source.start(0);
  },
  'click .map-window-comments': function(event) {
    event.preventDefault();
    var the_id = event.target.classList[3];

    Session.set('soundId', the_id);
  }
});
