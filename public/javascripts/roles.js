$(document).ready(function(){

  // Bind header click to trigger download
  $('.role').on('click', '.panel-heading', function(event) {
    
    // ßShow a loading screen
    $('#loadingScreenBody').html("Downloading your new role. This may take a few moments...");
    $('#loadingScreen').modal('show');

    // Fire server request to load data onto user system
    $.get('/api/role/create?roleCode='+$(this).data('code'))
      .success(function(data){
        $('#loadingScreenBody').fadeOut(1500, function() {
          $('#loadingScreenBody').html("Role created!");
          $('#loadingScreenBody').fadeIn();  
        });
      })
      .fail(function() {
        $('#loadingScreenBody').fadeOut(1500, function() {
          $('#loadingScreenBody').html("Unable to create role.");
          $('#loadingScreenBody').fadeIn();  
        });
      });
    
    event.preventDefault();
  });
  
});