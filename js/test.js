$(()=>{
    let todaysDate = moment(moment.now()).format("YYYY-MM-DD");
    $("#override-date").val(todaysDate);
});

function isOverriddenDate() {
    return $("#override-date").length>0 && $("#override-date").val().length>0;
}

function getOverriddenDateValues() {
    let elapsedSeconds = (performance.now()/1000).toFixed(0);
    return {
        unix: moment($("#override-date").val()).add(elapsedSeconds*1000).unix(),
        humanReadable: moment($("#override-date").val()).add(elapsedSeconds*1000).format("MM/DD/YY HH:mm:ss")
    }
}