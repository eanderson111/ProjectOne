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
            backgroundColor: 'rgb(10, 16, 22)',
            borderColor: 'rgb(10, 16, 22)',
            data: [snowTotal],
        }],
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "black",
                    fontSize: 12,
                    stepSize: 2,
                    beginAtZero:true,
                }
        }],
        xAxes: [{
            ticks: {
                min: 0,
                max: 20,
                stepSize: 2,
                fontColor: "black",
                fontSize: 12,
                stepSize: 2,
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
var todaysDate = moment().format("YYYY-MM-DD");
var config = {
  apiKey: "AIzaSyCy8E_5-bgcbj6sveBPO0PRAcVn0kWr_3g",
  authDomain: "ski-trip-planner.firebaseapp.com",
  databaseURL: "https://ski-trip-planner.firebaseio.com",
  projectId: "ski-trip-planner",
  storageBucket: "ski-trip-planner.appspot.com",
  messagingSenderId: "431066763908"
};
firebase.initializeApp(config);
var database = firebase.database();
var imgArray = [
  "../ProjectOne/assets/images/breckenridge.jpg",
  "../ProjectOne/assets/images/keystone.jpg",
  "../ProjectOne/assets/images/abasin.jpg",
  "../ProjectOne/assets/images/aspen.jpeg",
  "../ProjectOne/assets/images/breckenridge2.jpg"
];
// var skiData = {
//     resorts: [{
//       name: "Breckenridge",
//       state: "CO",
//       airportCode: "DEN",
//       latitude: 39.482231,
//       longitude: -106.046181,
//       snowTotal: 7.89,
//       image:"../ProjectOne/assets/images/breckenridge.jpg"
//     },
//     {
//       name: "Keystone",
//       state: "CO",
//       airportCode: "DEN",
//       latitude: 39.60506,
//       longitude: -105.95189,
//       snowTotal: 10.5,
//       image:"../ProjectOne/assets/images/keystone.jpg"
//     },
//     {
//       name: "Arapahoe Basin",
//       state: "CO",
//       airportCode: "DEN",
//       latitude: 39.642143,
//       longitude: -105.87181,
//       snowTotal: 12.01,
//       image:"../ProjectOne/assets/images/abasin.jpg"
//     },
//     {
//       name: "Aspen Highlands",
//       state: "CO",
//       airportCode: "DEN",
//       latitude: 39.18193,
//       longitude: -106.8565,
//       snowTotal: 5.50,
//       image:"../ProjectOne/assets/images/aspen.jpg"
//     },
//     {
//       name: "Aspen Mountain",
//       state: "CO",
//       airportCode: "DEN",
//       latitude: 39.186676,
//       longitude: -106.81816,
//       snowTotal: 0,
//       image:"../ProjectOne/assets/images/breckenridge2.jpg"
//     }
//     ],
// }

$( document ).ready(function() {



    var queryURL = "";
    var endpoint = "https://api.darksky.net/forecast/"
    var apiKey = "b99ad8277194d0b9b635cf36476edc5c/";
    var latitude = "";
    var longitude = "";
    var blocks = "?exclude=minutely,currently,hourly,flags";

    //TODO: if lastUpdated <> todays Date, call pullResortLoop
    //call pullResortLoop
    ///OPTION 1
    database.ref("lastUpdated").once('value').then(function(snapshot){
      console.log("before function call");
      console.log(snapshot.val());
      if(snapshot.val() === todaysDate) {
        console.log("in the first one");
        database.ref("topResorts").once('value').then(function(snapshot){
          console.log("before function call");
          console.log(snapshot.val());
          populateResortImages(snapshot);
        });
      } else {
        console.log("in the second one");
        pullResortLoop();
      }
    });
    

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

        console.log("Top Resort 0");
        console.log(JSON.stringify(topResorts[0], null, 2));


        //Push topResorts to firebase
        for(i = 0; i < 4; i++) {
          console.log(JSON.stringify(topResorts[i], null, 2));
          var thisResort = database.ref("topResorts/"+i);
          thisResort.set({
            name: topResorts[i].name,
            airport: topResorts[i].airportCode,
            latitude: topResorts[i].latitude,
            longitude: topResorts[i].longitude,
            snow: topResorts[i].snowTotal
          });
        }

        //update the updateDate
        database.ref("lastUpdated").set(todaysDate);

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

        database.ref("topResorts").once('value').then(function(snapshot){
          console.log("before function call");
          console.log(snapshot.val());
          populateResortImages(snapshot);
        });
        
      } 
      
    }


    //TODO: Make this so that it's reading from firebase
    function populateResortImages(snapshot) {

      console.log("SNAPSHOT ------------------");
      console.log(snapshot.val());
  
      var markup = "";
        for (j = 0; j < 4; j++) {
            //console.log(`${topResorts[j].image}`);
            console.log("**************");
            console.log(snapshot.child(j+"/name").val());
            // console.log(imgArray[j]);
            markup += `<div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                 <div class="result">
                <img src="${imgArray[j]}" alt="..." class="img-thumbnail" data-airportCode="${snapshot.child(j+"/airport").val()}">
                <h6 class="resortName">${snapshot.child(j+"/name").val()}</h6>
                <canvas class="chart" id="myChart${j}" width="100" height="50"></canvas>
            </div>
        </div>`            
          } 

      $("#resortResults").append(markup);
        for (j = 0; j < 4; j++) {
          var ctx = document.getElementById(`myChart${j}`);
          createChart(ctx, snapshot.child(j+"/snow").val());
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



$('body').on('click', '.img-thumbnail', function() {

  window.location.href = "flight.html?airportCode=" + $(this).data("airportcode");

});
