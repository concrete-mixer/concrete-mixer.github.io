// hey ho it's some jquery
$(document).ready(function() {
  // do it like this for now
  contributor_sites = {
    'Adrien Capozzi': 'http://www.adrien75.com/adrien75.html',
    'Michael Upton':  'http://nonwrestler.com',
    'Rob Szeliga':    'http://www.rszoniq.com',
    'Sebastian Broc': 'http://bemtevi.de/'
  }

  // initialise soundcloud client
  SC.initialize({
    client_id: '11bab725274cff587d5908c18cd501c2'
  });

  // kick off sockJS connection
  var sock = new SockJS('http://concretemixer.enrichme.io/cm-data');
  sock.onopen = function() {
    console.log('WS connection open');
  };

  sock.onmessage = function(e) {
    var data = JSON.parse(e.data)
    var id = '#stream' + data.stream
    var $el = $(id)

    if ( $el ) {
      if ( $('.panel-cover--collapsed').length === 1 ) {
        setStreamHtml.bind($el, data)
      }
      else {
        $el.fadeOut(500, setStreamHtml.bind($el, data))
      }
    }
  };

  var setStreamHtml = function(data) {
    var $el = this

    var contributorName = data.recordist

    if ( contributor_sites[data.recordist] !== undefined ) {
      contributorName = '<a href="'
        + contributor_sites[data.recordist]
        + '">' + data.recordist + '</a>'
    }

    if ( data.soundcloudTrackId ) {
      SC.get('/tracks/' + data.soundcloudTrackId)
        .then(function(track) {
          $el.html(
            contributorName
            + ': <a href="' + track.permalink_url
            + '" target="_blank">' + data.file + '</a>'
          )

          $el.fadeIn(500)
        });
    }
    else {
      $el.html(contributorName + ': ' + data.file);

      $el.fadeIn(500)
    }

    if ( $('#nowPlayingLabel').css('display') === 'none' ) {
      $('#nowPlayingLabel').fadeIn(500)
    }
  }

  sock.onclose = function() {
    console.log('WS connection closed');
  };
});

