//Variables
var weatherLink = document.querySelector("#weather")
var getForecast = document.querySelector('#getForecastBtn')

//Weather click in nav bar will show modal
$(weatherLink).click(function(){
  $('weatherModal').modal('show')
})

$(getForecast).on('click', function(){

  $('input[type="text"]').each(function(){    
      var id = $(this).attr('id');
      var value = $(this).val();
     localStorage.setItem(id, value);
     console.log(id, value);
  });   
});

