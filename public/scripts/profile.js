// Client facing scripts here
$(document).ready(function(){
  const renderRowOf3Maps = function(resultsMaps, divID) {
    for (let map of resultsMaps) {
      let spanClass = "";
      let iconClass = "";
      if (divID === '#rowOf3MapsCreated') {
        console.log('#rowOf3MapsCreated');
        iconClass = "fas fa-trash-alt";
        spanClass = "deleteIcon";

      } else {
        iconClass = "fas fa-heart";
        spanClass = "favouriteIcon";
      }

      if (divID === '#rowOf3MapsContributed') {
        mapTitle = map.map_id;
      } else {
        mapTitle = map.id;
      }

      $eachMapImg = $(`
      <div class="eachMapImg">
      <a href="/api/maps/${map.id}"><img src="${map.preview_image}" alt="a popular map"></a>
        <div class="caption">
          <p>${map.title}</p>
          <span class=${spanClass} data-id="${mapTitle}"><i class="${iconClass}"></i></span>
        </div>
      </div>
      `);
      $(divID).append($eachMapImg);
    }
    $(divID).append(`<div><i class="fas fa-angle-double-right"></i></div>`);
    return;
  }

  $("body").on('click',".favouriteIcon",function(event){
    event.preventDefault();
    console.log('clicked fave');
    //console.log(this.getAttribute("data-id"));
    const map_id = this.getAttribute("data-id");
    //console.log("event:", event);
    const data = {
      map_id
    }
    $.post('/api/maps/favourite',data, (results) =>{
      console.log("it worked favourite:", results);
    });
  })

  $("body").on('click',".deleteIcon",function(event){
    event.preventDefault();
    console.log('clicked delete');
    //console.log(this.getAttribute("data-id"));
    const map_id = this.getAttribute("data-id");
    //console.log("event:", event);
    $.post(`/api/maps/${map_id}/delete`, (results) =>{
      console.log("it worked delete:", results);
    });
  })

  const loadImgs = function() {
    console.log("loadImgs inside???");
    $.ajax({
      url: '/api/maps/rowOf3MapsCreated',
      method: "GET"
    })
    .then((result)=>{
      console.log("line69",result);
      renderRowOf3Maps(result, '#rowOf3MapsCreated');
    })
    .then(()=> {
      console.log("line81");
      $.get("/api/maps/rowOf3MapsContributed", (result) => {
        console.log("line75", result);
        renderRowOf3Maps(result, '#rowOf3MapsContributed');
      });
    })
    .then(()=> {
      $.get("/api/maps/rowOf3MapsFavourited", (result) => {
        console.log("line81",result);
        renderRowOf3Maps(result, '#rowOf3MapsFavourited');
      });
    })
    .catch((error)=>{
      console.log('error:',error);
    });
  }

  loadImgs();
});
