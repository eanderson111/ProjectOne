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

  
  $(document).on("click", "#update-db", function(){
      console.log("in the on click")

  database.ref().child("lastUpdated").set("2019-03-15");
  
  for(var i = 0; i < skiData.resorts.length; i++){
      thisResort = skiData.resorts[i]
      console.log(thisResort)
  database.ref('resorts').child(thisResort.name).set({
      state: thisResort.state,
      airport: thisResort.airportCode,
      latitude: thisResort.latitude,
      longitude: thisResort.longitude,
      snow: thisResort.snowTotal
  })

  for(j = 0; j < 4; j++) {
    database.ref('topResorts').child(j).set({
      name: "placeholder",
      state: "placeholder",
      airport: "placeholder",
      latitude: "placeholder",
      longitude: "placeholder",
      snow: "placeholder"
    })
  }
}
  })