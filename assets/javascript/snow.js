// CHART JS

function createChart(element, snowTotal) {

// var ctx = document.getElementById('myChart');
return new Chart(element, {
    // The type of chart we want to create
    type: 'horizontalBar',

    // The data for our dataset
    data: {
        // labels: ["Snow"],
        datasets: [{
            label: "Snowfall in inches",
            fontColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgb(200, 84, 19)',
            borderColor: 'rgb(200, 84, 19)',
            data: [snowTotal],
        }],
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "black",
                    fontSize: 14,
                    stepSize: 1,
                    beginAtZero:true,
                }
        }],
        xAxes: [{
            ticks: {
                min: 0,
                max: 10,
                stepSize: 1,
                fontColor: "black",
                fontSize: 14,
                stepSize: 1,
                beginAtZero: true
            }
        }]
    },
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(0, 0, 0)'
        }
     }
    }
});
}



//TODO : Add Daily Refresh Code so call made only once per day
//TODO : Organization - should this all be within one object
//TODO : change 'WRITE RESULTS TO HTML' section to integrate with the front end

//Notes : For testing, the ajax call fires off of clicking the button with class button
// This should be changed in the final version to run at onLoad and check if the ajax calls
// have already been made within the past day, and the pull the data from firebase if so

//* Important */
//Notes - DarkSKY API free tier allows for 1000 api calls per day, so be somewhat conservative with 
//making calls for the resorts array during testing

var count = 0;
var skiData = {
    resorts: [{
      name: "Breckenridge",
      state: "CO",
      airportCode: "DEN",
      latitude: 39.482231,
      longitude: -106.046181,
      snowTotal: 7.89,
      image:"../ProjectOne/assets/images/breckenridge.jpg"
    },
    {
      name: "Keystone",
      state: "CO",
      airportCode: "DEN",
      latitude: 39.60506,
      longitude: -105.95189,
      snowTotal: 10.5,
      image:"../ProjectOne/assets/images/keystone.jpg"
    },
    {
      name: "Arapahoe Basin",
      state: "CO",
      latitude: 39.642143,
      longitude: -105.87181,
      snowTotal: 12.01,
      image:"../ProjectOne/assets/images/abasin.jpg"
    },
    {
      name: "Aspen Highlands",
      state: "CO",
      airportCode: "DEN",
      latitude: 39.18193,
      longitude: -106.8565,
      snowTotal: 5.50,
      image:"../ProjectOne/assets/images/aspen.jpg"
    },
    {
      name: "Aspen Mountain",
      state: "CO",
      airportCode: "DEN",
      latitude: 39.186676,
      longitude: -106.81816,
      snowTotal: 0,
      image:"../ProjectOne/assets/images/breckenridge2.jpg"
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

    //call pullResortLoop
    pullResortLoop();

    // - Loops through the skiData.resorts array, making an API call for each resort
    // to pull the 7 day snow forecast.
    function pullResortLoop() {
      count = 0;
      for (i = 0; i < skiData.resorts.length; i++) {
        pullResortData(i);
      }
      return;
    };

    //object compare funciton used to sort array of objects
    function sortBySnowTotal(a, b){
      var aTotal = Number(a.snowTotal);
      var bTotal = Number(b.snowTotal); 
      return ((aTotal > bTotal) ? -1 : ((aTotal < bTotal) ? 1 : 0));
    }

    function mainSnowTotal(count) {

      //only execute after all ajax calls have come in
      if (count === skiData.resorts.length) {
        
        var resortsSorted = skiData.resorts.sort(sortBySnowTotal);
        var topResorts = resortsSorted.slice(0,4);  //not sure why this is 0,3 instead of 0,2 for top 3, but it is

        //console log results
        console.log("*All Resorts Sorted*");
        console.log(JSON.stringify(resortsSorted, null, 2));
        console.log("*Top Resorts Sorted*");
        console.log(JSON.stringify(topResorts, null, 2));

        //* WRITE RESULTS TO HTML *
        // for (j = 0; j < topResorts.length; j++) {
        //     var resort = $("<div>");
        //     var resortName = topResorts[j].name;
        //     var buttonOne = $("<button>").text(resortName);
        //     resort.append(buttonOne);
        //     $(".resortOne").append(resort);
        //   }

        var markup = "";
        for (j = 0; j < topResorts.length; j++) {
            console.log(`${topResorts[j].image}`);
            markup += `<div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                 <div class="result">
                <img src="${topResorts[j].image}" alt="..." class="img-thumbnail">
                <h6 class="resortName">${topResorts[j].name}</h6>
                <canvas class="chart" id="myChart${j}" width="100" height="50"></canvas>
            </div>
        </div>`            
          } 
      } 
      $("#resortResults").append(markup);
      for (j = 0; j < topResorts.length; j++) {
        var ctx = document.getElementById(`myChart${j}`);
        createChart(ctx, topResorts[j].snowTotal);
      }
    }

 

    function pullResortData(i) {

      var resort = skiData.resorts[i];  
      var queryURL = endpoint + apiKey + resort.latitude + "," + resort.longitude + blocks;

      console.log(queryURL);

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp"
      })
        .then(function(response) { 
          
        var daily = response.daily.data;
        var snowTotal = 0;
            
        //loop through 7 day forecast and calculate snowTotal for all 7 days
        for (var j = 0; j < daily.length; j++) {

          //for DarkSky API, need to check if any probability of percipitations exists, and
          //if the type is 'snow' before summing
          if(Number(daily[j].precipProbability) > 0){
            if(daily[j].precipType === "snow") {
              snowTotal += Number(daily[j].precipAccumulation)
              console.log("Snow Total = " + snowTotal);
            }
          }

        } //close for loop

        //save snowTotal to resorts array
        resort.snowTotal = snowTotal;

        //increment the ajax count (used to identify when all ajax calls have returned)
        count++;
        mainSnowTotal(count);

      }); // close ajax call
    } //close pull resort function

}); //close on click function
