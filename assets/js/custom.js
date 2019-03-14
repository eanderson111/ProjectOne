//dark sky - b99ad8277194d0b9b635cf36476edc5c
//open weather - ea7b88518313d3f084491cee4cc75443
//myweather2 - 
// 

// https://api.darksky.net/forecast/b99ad8277194d0b9b635cf36476edc5c/40.58884,-111.63798?blocks=minutely

var skiData = {
    resorts: [{
      name: "Breckenridge",
      state: "CO",
      latitude: 39.482231,
      longitude: -106.046181,
      snowTotal: 0
    },
    {
      name: "Keystone",
      state: "CO",
      latitude: 39.60506,
      longitude: -105.95189,
      snowTotal: 0
    },
    {
      name: "Arapahoe Basin",
      state: "CO",
      latitude: 39.642143,
      longitude: -105.87181,
      snowTotal: 0
    },
    {
      name: "Aspen Highlands",
      state: "CO",
      latitude: 39.18193,
      longitude: -106.8565,
      snowTotal: 0
    },
    {
      name: "Aspen Mountain",
      state: "CO",
      latitude: 39.186676,
      longitude: -106.81816,
      snowTotal: 0
    }
    ],
}



$('body').on('click', '.button', function() {

    var queryURL = "";
    var endpoint = "https://api.darksky.net/forecast/"
    var apiKey = "b99ad8277194d0b9b635cf36476edc5c/";
    var latitude = "";
    var longitude = "";
    var blocks = "?exclude=minutely,currently,hourly,flags";

    //pullResortWrapper();
    returnResorts();

    async function returnResorts () {
      await pullResortWrapper();

      console.log("HERE I AM");
      console.log(JSON.stringify(skiData.resorts.sort(sortBySnowTotal)));
    
    }

    function sortBySnowTotal(a, b){
      var aTotal = Number(a.snowTotal);
      var bTotal = Number(b.snowTotal); 
      return ((aTotal < bTotal) ? -1 : ((aTotal > bTotal) ? 1 : 0));
    }
    
    async function pullResortWrapper() {
      for (i = 0; i < skiData.resorts.length; i++) {
        pullResortData(i);
      }
      return;
    };

    function pullResortData(i) {

      var resort = skiData.resorts[i];  
      alert("i = " + i + ", name = " + resort.name);
      var queryURL = endpoint + apiKey + resort.latitude + "," + resort.longitude + blocks;
      console.log(queryURL);

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp"
      })
        // After data comes back from the request
        .then(function(response) {       
          
        // console.log(response);  
        
        var daily = response.daily.data;
        var snowTotal = 0;
            
        //loop through 7 day forecast
        for (var j = 0; j < daily.length; j++) {

          if(Number(daily[j].precipProbability) > 0){
            if(daily[j].precipType === "snow") {
              snowTotal += Number(daily[j].precipAccumulation)
              console.log("Snow Total = " + snowTotal);
            }
          }

        } //close for loop
        resort.snowTotal = snowTotal;

        // console.log("****SKI DATA*******");
        // console.log(JSON.stringify(skiData));
        //report snow total
        // $(".altaButton").html("Snow Total for next 7 days = " + snowTotal.toFixed(2) + '"');

      }); // close ajax call
    } //close function

      

      
});
