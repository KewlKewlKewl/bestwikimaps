$(document).ready(function() {
  $('#login-ref').on('click', function(event) {
    event.preventDefault();
    console.log("LOGIN WORKING")
    $.ajax({
      method: 'POST',
      url: '/login',
    })
    .then((result) => {
      window.location.href = "/index"
      console.log('LOGIN SUCCESS')
    })
    .catch((error) => {
      console.log(error)
    })
  })

  // $('#logout-ref').on('click', function(event) {
  //   event.preventDefault();
  //   console.log("LOGOUT WORKING")
  //   $.ajax({
  //     method: 'POST',
  //     url: '/logout',
  //   })
  //   .then((result) => {
  //     window.location.href = "/index"
  //     console.log('LOGOUT SUCCESS')
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // })

})

