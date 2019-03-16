//fake value to be replaced
var outboundAirport = "MSP"
var outboundDate = "2019-04-01"
var inboundAirport = "DEN"
var inboundDate = "2019-04-05"
//api call to skyscanner to get lowest price
$.ajax({
    url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/' + outboundAirport + '-sky/' + inboundAirport + '-sky/' + outboundDate + '?inboundpartialdate=' + inboundDate,
    type: 'GET',
    headers: {
        "X-RapidAPI-Key": "fc785122bcmshc626804037ac929p15409bjsn43bc860293c8",   //If your header name has spaces or any other char not appropriate
    },
    success: function (res) {
        console.log(res);
        numOfQuotes = res.Quotes.length
        for (var i = 0; i < numOfQuotes; i++) {
            var thisQuote = res.Quotes[i]
            var $div = $('<div id="quote' + i + '">')
            var $p = $('<p>').text('Flights from ' + res.Currencies[0].Symbol + thisQuote.MinPrice)
            var $btn = $('<button>').text("book now").attr('referral', 'http://partners.api.skyscanner.net/apiservices/referral/v1.0/US/USD/en-US/' + outboundAirport + '/' + inboundAirport + '/' + outboundDate + '/' + inboundDate + '?apiKey=fc785122bcmshc626804037ac929p15409bjsn43bc860293c8').attr("class", "book-btn")
            $div.append($p).append($btn)
            $("#quotes").append($div)
        }
    }


});
//link to book on skyscanner
$(document).on("click", ".book-btn", function () {
    window.location.href = $(this).attr("referral")


})