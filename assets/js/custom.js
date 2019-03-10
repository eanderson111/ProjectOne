//dark sky - b99ad8277194d0b9b635cf36476edc5c
//open weather - ea7b88518313d3f084491cee4cc75443
//myweather2 - 
// 

https://api.darksky.net/forecast/b99ad8277194d0b9b635cf36476edc5c/40.58884,-111.63798?blocks=minutely



$('body').on('click', '.button', function() {

    var queryURL = "";
    var endpoint = "https://api.darksky.net/forecast/"
    var apiKey = "b99ad8277194d0b9b635cf36476edc5c/";
    var latitude = "40.58884,";
    var longitude = "-111.63798";
    var blocks = "?exclude=minutely,currently,hourly,flags";

    
    

    var queryURL = endpoint + apiKey + latitude + longitude + blocks;
    console.log(queryURL);

    $.ajaxPrefilter( function (options) {
      if (options.crossDomain && jQuery.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
        //options.url = "http://cors.corsproxy.io/url=" + options.url;
      }
    });

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
        // dataType: "jsonp"
      })
        // After data comes back from the request
        .then(function(response) {       
          
        console.log(response);  
        
        var daily = response.daily.data;
        var snowTotal = 0;
            
        //loop through 7 day forecast
        for (var i = 0; i < daily.length; i++) {

          if(Number(daily[i].precipProbability) > 0){
            if(daily[i].precipType === "snow") {
              snowTotal += Number(daily[i].precipAccumulation)
              console.log("Snow Total = " + snowTotal);
            }
          }

        } //close for loop

        //report snow total
        $(".altaButton").html("Snow Total for next 7 days = " + snowTotal.toFixed(2) + '"');

      }); // close ajax call

      
});
