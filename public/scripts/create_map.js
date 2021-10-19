  function initMap() {
      var options = {  // Creates map options to add to the default map.
          zoom:8,
          center:{lat:29.9511,lng:-90.0715}
      }
      var map = new google.maps.Map(document.getElementById('map'), options); //Creates the map and includes the options.

      //Listen for click on map
      google.maps.event.addListener(map, 'click', function(event){
          addMarker({coordinates:event.latLng}); //Add marker
          document.getElementById("marker_example").value=event.latLng.toUrlValue();
      });

      //Array of markers
      var markers = [
          {
              coordinates:{lat:29.9841,lng:-90.1529},
              iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
              content:'<h1>Metarie, LA</h1>'
          },
          {
              coordinates:{lat:29.9146,lng:-90.0540},
              content:'<h1>Gretna, LA</h1>'
          },
          {
              coordinates:{lat:30.4583,lng:-91.1403},
              content:'<h1>Baton Rouge, LA</h1>'
          }
      ];

      //Loop through markers
      for(var i = 0;i < markers.length;i++) {
          addMarker(markers[i]); //Add markers
      }



      //Add Marker function
      function addMarker(props) {
              const marker = new google.maps.Marker({
              position:props.coordinates,
              map:map,
              //icon:props.iconImage
          });

          // testing for coordinates retrieval
          // coordinates:{lat:29.9841,lng:-90.1529},
          markers.push({ coordinates: {lat:props.coordinates.lat(), lng:props.coordinates.lng()}});
          console.log(markers);
          console.log(props.coordinates);

          if(props.iconImage) {  //Check for custom icon
            marker.setIcon(props.iconImage); //Set icon image
          }

          if(props.content) { //Check content
            var infoWindow = new google.maps.InfoWindow({
              content:props.content
            });

            marker.addListener('click', function() {
              infoWindow.open(map,marker);
            });
          }
      }
  }
