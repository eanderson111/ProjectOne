var userSpecifiedOriginAirport = $(".airportcode").val()
var userSpecifiedOutboundDate
var userSpecifiedInboundDate
//dummy value
var userSpecifiedDestinationAirport = "DEN" 


//link to book on skyscanner
$(document).on("click", ".book-btn", function () {
    window.location.href = $(this).attr("referral")
})

$(document).on("click", "#search-flights-button", function(){
    console.log("in the on click")

    var daterange = $("#date-values").val()
    daterange = daterange.split("-")
    console.log(daterange)
    userSpecifiedOutboundDate = moment(daterange[0].trim()).format("YYYY-MM-DD")
    userSpecifiedInboundDate = moment(daterange[1].trim()).format("YYYY-MM-DD")
    userSpecifiedOriginAirport = $(".airportcode").val()
    

    if (userSpecifiedInboundDate != null && userSpecifiedOutboundDate != null) {
        getCheapestFlight(userSpecifiedOutboundDate, userSpecifiedInboundDate) }
/*     else {
        var today = moment()
        for (var i = 0; i < 7; i++) {
            var thisStartDate = today.add(7+i, 'day').format('YYYY-MM-DD')
            var thisEndDate = today.add(10+i, 'day').format('YYYY-MM-DD')
            console.log(thisStartDate)
            console.log(thisEndDate)
        } */

})



function getCheapestFlight(outDate, inDate ){
    $.ajax({
        url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/' + userSpecifiedOriginAirport + '-sky/' + userSpecifiedDestinationAirport + '-sky/' + outDate,
        type: 'GET',
        headers: {
            "X-RapidAPI-Key": "fc785122bcmshc626804037ac929p15409bjsn43bc860293c8",   //If your header name has spaces or any other char not appropriate
        }, success: function (outboundRes) {
            $.ajax({
                url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/' + userSpecifiedDestinationAirport + '-sky/' + userSpecifiedOriginAirport + '-sky/' + inDate,
                type: 'GET',
                headers: {
                    "X-RapidAPI-Key": "fc785122bcmshc626804037ac929p15409bjsn43bc860293c8",   //If your header name has spaces or any other char not appropriate
                }, success: function (inboundRes) {
                   var thisOutboundQuote = outboundRes.Quotes[0]
                   var thisInboundQuote = inboundRes.Quotes[0]
                   var thisOutboundCarrierId = thisOutboundQuote.OutboundLeg.CarrierIds[0]
                   var thisInboundCarrierId = thisInboundQuote.OutboundLeg.CarrierIds[0]
                   var thisOutboundCarrierName
                   var thisOutboundNumberOfCarriers = outboundRes.Carriers.length
                   for (var j= 0; j < thisOutboundNumberOfCarriers; j++){
                                     if (thisOutboundCarrierId == outboundRes.Carriers[j].CarrierId) {thisOutboundCarrierName = outboundRes.Carriers[j].Name}
                                 }
                    var thisInboundCarrierName
                    var thisInboundNumberOfCarriers = inboundRes.Carriers.length
                    for (var k= 0; k < thisInboundNumberOfCarriers; k++){
                                    if (thisInboundCarrierId == inboundRes.Carriers[k].CarrierId) {thisInboundCarrierName = inboundRes.Carriers[k].Name}
                                }
                    var thisPrice = parseInt(thisOutboundQuote.MinPrice) + parseInt(thisInboundQuote.MinPrice)
                    var thisDirect
                    if (thisOutboundQuote.Direct && thisInboundQuote.Direct) {thisDirect = "Direct"}
                    else {thisDirect = "Indirect"}
                    var $btn = $('<button>').text("book now").attr('referral', 'http://partners.api.skyscanner.net/apiservices/referral/v1.0/US/USD/en-US/' + userSpecifiedOriginAirport + '/' + userSpecifiedDestinationAirport + '/' + outDate + '/' + inDate + '?apiKey=fc785122bcmshc626804037ac929p15409bjsn43bc860293c8').attr("class", "book-btn")
                    var $row = $("<tr>")
                    var $carrierOut = $("<td>").text(thisOutboundCarrierName)
                    var $carrierIn = $("<td>").text(thisInboundCarrierName)
                    var $outDate = $("<td>").text(outDate)
                    var $inDate = $("<td>").text(inDate)
                    var $price = $("<td>").text(thisPrice)
                    var $direct = $("<td>").text(thisDirect)
                    $row.append($carrierOut).append($outDate).append($carrierIn).append($inDate).append($price).append($direct).append($btn)
                    $("#flight-table").append($row)
        
        
                },
                error(){}
            })
            


        },
        error(){}
    })}
        