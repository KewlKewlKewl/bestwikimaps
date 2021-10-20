// Client facing scripts here
$(document).ready(function(){



  const renderLastFavourited = function(result) {
    //input: imgURL as a string
    //updates '#lastFavouritedMap' div with preview_img of last fav img
    $lastFavouritedMapImg = $(`
    <h1>Last Favourited Map</h1>
    <a href="/api/maps/${result.map_id}"><img src="${result.preview_image}" alt="My Last Favourite Map"></a>
    <p>${result.title}</p>
    `);
    $('#lastFavouritedMap').append($lastFavouritedMapImg);
    return;
  }

  const renderRowOf3Maps = function(resultsMaps) {
    for (let map of resultsMaps) {
      $eachMapImg = $(`
      <div class="eachMapImg">
      <a href="/api/maps/${map.id}"><img src="${map.preview_image}" alt="a popular map"></a>
        <div class="test">
          <p>${map.title}</p>
          <span class="favouriteIcon" data-id="${map.id}"><i class="fas fa-heart"></i></span>
        </div>
      </div>
      `);
      $('#rowOf3Maps').append($eachMapImg);
    }
    return;
  }

  $("body").on('click',".favouriteIcon",function(event){
    event.preventDefault();
    console.log('clicked');
    //console.log(this.getAttribute("data-id"));
    const map_id = this.getAttribute("data-id");
    //console.log("event:", event);
    const data = {
      map_id
    }
    $.post('/api/maps/favourite',data, (results) =>{
      console.log("it worked:", results);
    });
  })

  const loadImgs = function() {
    console.log("loadImgs inside???");
    $.ajax({
      url: '/api/maps/favourite',
      method: "GET"
    })
    .then((result)=>{
      //where 'result' is an array:
      //result[0] = 1 object with the last favourited map
      //result[1] = 3 objects where each is a map
      console.log("result in ajax then:", result);
      renderLastFavourited(result[0]);
    })
    .then(()=> {
    //.then (//add another get request here for the 3 maps??)
      console.log("line58");
      $.get("/api/maps/rowOf3", (resultsArray) => {
        renderRowOf3Maps(resultsArray);
      });
    })
    .then((result)=>{
      //where 'result' is an array:
      //result[0] = 1 object with the last favourited map
      //result[1] = 3 objects where each is a map
      // renderRowOf3Maps(resultsMaps);
    })
    .catch((error)=>{
      console.log('error:',error);
    });
  }

  loadImgs();
});
