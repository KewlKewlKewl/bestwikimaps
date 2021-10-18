// Client facing scripts here
$(document).ready(function(){

  const renderLastFavourited = function(imgURL) {
    //input: imgURL as a string
    //updates '#lastFavouritedMap' div with preview_img of last fav img
    $lastFavouritedMapImg = $(`
    <img src="${imgURL}" alt="My Last Favourite Map">
    `);
    $('#lastFavouritedMap').append($lastFavouritedMapImg);
    return;
  }

  // const escape = function (str) {
  //   let div = document.createElement("div");
  //   div.appendChild(document.createTextNode(str));
  //   return div.innerHTML;
  // };

  const renderRowOf3Maps = function(resultsMaps) {
    for (let map in resultsMaps) {
      $eachMapImg = $(`
      <img src="${map.preview_img}" alt="a popular map">
      `);
      $('#rowOf3Maps').append($eachMapImg);
    }
    return;
  }

  $('.favouriteThisImg').on("click", function(event){
    event.preventDefault();
    let textEntered = $(this).serialize().slice(5);

    $.ajax({
      url: '/tweets/',
      method: "POST",
      data: $(this).serialize()
    })
    .then((result)=>{

    })
    .catch((error)=>{
      console.log('error:',error);
    });

  });

  const loadImgs = function() {
    $.ajax({
      url: '/',
      method: "GET"
    })
    .then((result)=>{
      //where 'result' is an array:
      //result[0] = 1 object with the last favourited map
      //result[1] = 3 objects where each is a map
      renderLastFavourited(result[0].preview_img);
      return result;
    })
    .then((result)=>{
      //where 'result' is an array:
      //result[0] = 1 object with the last favourited map
      //result[1] = 3 objects where each is a map
      renderRowOf3Maps(result[1]);
    })
    .catch((error)=>{
      console.log('error:',error);
    });
  }

  loadTweets();
});
