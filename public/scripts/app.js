// Client facing scripts here

  // displays all visual markers on the map
  function setMapOnAll(map) {
    for (let i = 0; i < visualMarkers.length; i++) {
    visualMarkers[i].setMap(map);
    }
}

// hides all visual markers on the map
function removeMarkers() {
for(let i = 0; i < visualMarkers.length; i++){
    visualMarkers[i].setMap(null);
}
}

// this generates the table which contains all point elements (these are then inserted and displayed in #pointsList)
const generatePointsList = function(markers){

let t = `<tr>
            <th>Title</th>
            <th>Description</th>
            <th id ='latHeader'>Lat</th>
            <th id ='longHeader'>Long</th>
            <th>Category</th>
            <th>Image</th>
            <th>Delete Point</th>
        </tr>`;
for (let i = 0; i < markers.length; i++){
  if (!markers[i].pointImage) {
    markers[i].pointImage = 'https://i.pinimg.com/474x/b4/7b/96/b47b9623ba93546b9a2c412e1abe9306.jpg'; //if db or user does not have a image -> marker image is given a default
  }
  // ultra critical that this tr id does not change - it must remain as the pointTitle or various features will not work
  let tr = `<tr id = "${markers[i].pointTitle}">`;
  tr += "<td>"+markers[i].pointTitle+"</td>";
  tr += "<td>"+markers[i].pointDescription+"</td>";
  tr += "<td id = 'lat'>"+markers[i].coordinates.lat+"</td>";
  tr += "<td id = 'long'>"+markers[i].coordinates.lng+"</td>";
  tr += "<td>"+markers[i].category+"</td>";
  tr += `<td id='point-image'><a href='${markers[i].pointImage}' target='_blank'><img height=75px width=100px src='${markers[i].pointImage}'></a></td>`;
  tr += "<td>"+`<input type='button' value="Delete" class='removeItem'>`+"</td>";
  tr += "</tr>";
  t += tr;
}
  document.getElementById("pointsList").innerHTML = t;
};

function addMarker(props) {

  const marker = new google.maps.Marker({
    position:props.coordinates,
    map:map,
    icon: props.iconImage,
  });

  // sends newly created marker into visualMarkers array
  visualMarkers.push(marker);


  // this function prevents multiple unsaved markers from showing on the map
  function visualMarkerLimiter() {

    // if the visualmarkers and markers lengths differ by more than one and markers is empty then it will simply delete the first visual marker and display the last
    if (visualMarkers.length - markers.length > 1 && markers.length === 0) {
      // console.log("This is showing because the markers.length is 0");
      removeMarkers();
      visualMarkers.splice(0, 1);
      setMapOnAll(map);
    }

    // this contains the validated visual markers (populated by the for loops below) which will then be pushed to markers
    const validatedVisualMarkers = [];

    if (visualMarkers.length - markers.length > 1 && markers.length >= 1) {
      for (let j = 0; j < visualMarkers.length; j++) {
        for (let i = 0; i < markers.length; i++) {
          // for ease of validating that the marker and visualmarker lats and lngs are matching
          // console.log("visualMarker lat:", visualMarkers[j].position.lat().toFixed(4));
          // console.log("markers lat:", parseFloat(markers[i].coordinates.lat).toFixed(4));
          // console.log("visualMarker lng:", visualMarkers[j].position.lng().toFixed(4));
          // console.log("markers lng:", parseFloat(markers[i].coordinates.lng).toFixed(4));

          if (visualMarkers[j].position.lat().toFixed(4) === parseFloat(markers[i].coordinates.lat).toFixed(4) && visualMarkers[j].position.lng().toFixed(4) === parseFloat(markers[i].coordinates.lng).toFixed(4)) {
            console.log("They matched!");
            validatedVisualMarkers.push(visualMarkers[j]);
          }
        }
      }
      removeMarkers();
      // HUGE NOTE HERE - READ THIS - SET visualMarkers to a let variable instead of a const or this will fail
      visualMarkers = validatedVisualMarkers;
      setMapOnAll(map);
    }
  };
  visualMarkerLimiter();
}

function editMarker(props) {
  let marker;
  if (!props.iconImage) {
    const iconImage = iconSelector(props.category);

    marker = new google.maps.Marker({
        position:props.coordinates,
        map:map,
        icon:iconImage
    });

  } else {
    marker = new google.maps.Marker({
    position:props.coordinates,
    map:map,
    icon:props.iconImage
    });
  }

    // sends newly created marker into visualMarkers array with the coordinates
    visualMarkers.push(marker);

    function visualMarkerLimiter() {

    // if the visualmarkers and markers lengths differ by more than one and markers is empty then it will simply delete the first visual marker and display the last
    if (visualMarkers.length - markers.length > 1 && markers.length === 0) {
      // console.log("This is showing because the markers.length is 0");
      removeMarkers();
      visualMarkers.splice(0, 1);
      setMapOnAll(map);
    }

    // this contains the validated visual markers (populated by the for loops below) which will then be pushed to markers
    const validatedVisualMarkers = [];

    if (visualMarkers.length - markers.length > 1 && markers.length >= 1) {
      for (let j = 0; j < visualMarkers.length; j++) {
        for (let i = 0; i < markers.length; i++) {
          // for ease of validating that the marker and visualmarker lats and lngs are matching
          // console.log("visualMarker lat:", visualMarkers[j].position.lat().toFixed(4));
          // console.log("markers lat:", parseFloat(markers[i].coordinates.lat).toFixed(4));
          // console.log("visualMarker lng:", visualMarkers[j].position.lng().toFixed(4));
          // console.log("markers lng:", parseFloat(markers[i].coordinates.lng).toFixed(4));

          if (visualMarkers[j].position.lat().toFixed(4) === parseFloat(markers[i].coordinates.lat).toFixed(4) && visualMarkers[j].position.lng().toFixed(4) === parseFloat(markers[i].coordinates.lng).toFixed(4)) {
            console.log("They matched!");
            validatedVisualMarkers.push(visualMarkers[j]);
          }
        }
      }
      removeMarkers();
      // HUGE NOTE HERE - READ THIS - SET visualMarkers to a let variable instead of a const or this will fail
      visualMarkers = validatedVisualMarkers;
      setMapOnAll(map);
    }
  };
  visualMarkerLimiter();

    console.log("just updated visualMarkers:", visualMarkers)

    // if(props.iconImage) {  //Check for custom icon
    //   marker.setIcon(props.iconImage); //Set icon image
    // }

    if(props.content) { //Check content
      let infoWindow = new google.maps.InfoWindow({
        content:props.content
      });

      marker.addListener('click', function() {
        infoWindow.open(map,marker);
      });
    }
}

const iconSelector = (category) => {
  const iconOptions = {
    Food: "https://img.icons8.com/office/40/000000/hamburger.png",
    Shopping: "https://img.icons8.com/office/40/000000/mastercard-credit-card.png",
    Nature: "https://img.icons8.com/office/40/000000/forest.png",
    Nightlife: "https://img.icons8.com/office/40/000000/dancing.png"
  };
  const iconOptionKeys = Object.keys(iconOptions);

  for (const key of iconOptionKeys) {

    if (category === key) {
      return iconOptions[key];
    }
  }
};

const generateRandomString = () => {
  let randomString = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomString;
};

module.exports = generateRandomString;
