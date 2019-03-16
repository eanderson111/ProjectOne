var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

    // The data for our dataset
    data: {
        // labels: ["Snow"],
        datasets: [{
            label: "Snowfall",
            fontColor: 'rgb(255, 255, 255)',
            backgroundColor: 'rgb(200, 84, 19)',
            borderColor: 'rgb(200, 84, 19)',
            data: [6],
        }],
    
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white",
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
                fontColor: "white",
                fontSize: 14,
                stepSize: 1,
                beginAtZero: true
            }
        }]
    },
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 255, 255)'
        }
     }
    }
});

var ctx = document.getElementById('myChart-2').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

   // The data for our dataset
   data: {
    // labels: ["Snow"],
    datasets: [{
        label: "Snowfall",
        fontColor: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(200, 84, 19)',
        borderColor: 'rgb(200, 84, 19)',
        data: [6],
    }],

},

// Configuration options go here
options: {
    scales: {
        yAxes: [{
            ticks: {
                fontColor: "white",
                fontSize: 18,
                stepSize: 1,
                beginAtZero:true,
            }
    }],
    xAxes: [{
        ticks: {
            min: 0,
            max: 10,
            stepSize: 1,
            fontColor: "white",
            fontSize: 14,
            stepSize: 1,
            beginAtZero: true
        }
    }]
},
    legend: {
        display: true,
        labels: {
            fontColor: 'rgb(255, 255, 255)'
    }
 }
}
});

var ctx = document.getElementById('myChart-3').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

 // The data for our dataset
 data: {
    // labels: ["Snow"],
    datasets: [{
        label: "Snowfall",
        fontColor: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(200, 84, 19)',
        borderColor: 'rgb(200, 84, 19)',
        data: [6],
    }],

},

// Configuration options go here
options: {
    scales: {
        yAxes: [{
            ticks: {
                fontColor: "white",
                fontSize: 18,
                stepSize: 1,
                beginAtZero:true,
            }
    }],
    xAxes: [{
        ticks: {
            min: 0,
            max: 10,
            stepSize: 1,
            fontColor: "white",
            fontSize: 14,
            stepSize: 1,
            beginAtZero: true
        }
    }]
},
    legend: {
        display: true,
        labels: {
            fontColor: 'rgb(255, 255, 255)'
    }
 }
}
});

var ctx = document.getElementById('myChart-4').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

  // The data for our dataset
  data: {
    // labels: ["Snow"],
    datasets: [{
        label: "Snowfall",
        fontColor: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(200, 84, 19)',
        borderColor: 'rgb(200, 84, 19)',
        data: [6],
    }],

},

// Configuration options go here
options: {
    scales: {
        yAxes: [{
            ticks: {
                fontColor: "white",
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
            fontColor: "white",
            fontSize: 14,
            stepSize: 1,
            beginAtZero: true
        }
    }]
},
    legend: {
        display: true,
        labels: {
            fontColor: 'rgb(255, 255, 255)'
    }
 }
}
});