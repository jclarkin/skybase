$(document).ready(function(){

  // Bind header click to trigger download
  $('.assembly').on('click', '.panel-heading', function(event) {
    
    // Show a loading screen
    $('#loadingScreenBody').html("Downloading your assembly. This may take a few moments...");
    $('#loadingScreen').modal('show');
    
    // Fire server request to load data onto user system    
    $.get('/api/assy/create?assyCode='+$(this).data('code'))
      .success(function(data){
        $('#loadingScreenBody').fadeOut(1500, function() {
          $('#loadingScreenBody').html("Assembly created!");
          $('#loadingScreenBody').fadeIn();  
        });
      })
      .fail(function() {
        $('#loadingScreenBody').fadeOut(1500, function() {
          $('#loadingScreenBody').html("Unable to create assembly.");
          $('#loadingScreenBody').fadeIn();  
        });
      });
    
    event.preventDefault();
  });
  
});