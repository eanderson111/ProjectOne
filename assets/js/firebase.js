
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBx1EUE7yyJCMUdYCD880P_fbPSmxX6-5w",
        authDomain: "project-one-1fe95.firebaseapp.com",
        databaseURL: "https://project-one-1fe95.firebaseio.com",
        projectId: "project-one-1fe95",
        storageBucket: "project-one-1fe95.appspot.com",
        messagingSenderId: "326025099424"
    };
    firebase.initializeApp(config);

    //TODO initialize all variables
    var database = firebase.database();
    var lastUpdated = "3-10-2019";
    var name = "Alta";
    var latitude = "";
    var longitude = "";
    var snowfall = [1,2,3,4,5,6,7];
    var snowTotal = 10;

    database.ref().set({
        lastUpdated: lastUpdated,
    });

    //***TODO need to know how to connect variables to connections */

    //TODO game starts if and only if 2 concurrent connections exist to the db
        //1 connection will show a screen of waiting for opponent to join
        //3rd attempted connnection will be told the game is full

    //TODO log each person choice and tell both what the outcome was






    // reference code

    // $("#click-button").on("click", function() {
    //   clickCounter--;
    //   database.ref().set({
    //     clickCount: clickCounter
    //   });
    //   if(clickCounter === 0) {
    // $("body").append('<iframe src="https://giphy.com/embed/26tOZ42Mg6pbTUPHW" width="480" height="320" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/26tOZ42Mg6pbTUPHW">via GIPHY</a></p>')
    // }
    // });


    // database.ref().on("value", function(snapshot) {
    //   console.log(snapshot.val());
    //   $("#click-value").text(snapshot.val().clickCount);
    //   clickCounter = snapshot.val().clickCount;
    // }, function(errorObject) {
    //   console.log("The read failed: " + errorObject.code);
    // });

