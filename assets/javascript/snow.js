var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["Snow"],
        datasets: [{
            label: "Snowfall",
            backgroundColor: 'rgb(200, 84, 19)',
            borderColor: 'rgb(200, 84, 19)',
            data: [10],
        }]
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }

    }
});

var ctx = document.getElementById('myChart-2').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["Snow"],
        datasets: [{
            label: "Snowfall",
            backgroundColor: 'rgb(200, 84, 19)',
            borderColor: 'rgb(200, 84, 19)',
            data: [10],
        }]
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }

    }
});

var ctx = document.getElementById('myChart-3').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["Snow"],
        datasets: [{
            label: "Snowfall",
            backgroundColor: 'rgb(200, 84, 19)',
            borderColor: 'rgb(200, 84, 19)',
            data: [10],
        }]
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }

    }
});

var ctx = document.getElementById('myChart-4').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["Snow"],
        datasets: [{
            label: "Snowfall",
            backgroundColor: 'rgb(200, 84, 19)',
            borderColor: 'rgb(200, 84, 19)',
            data: [8],
        }]
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }

    }
});