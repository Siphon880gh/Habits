function save() {
    // console.log("f save");
    setTimeout(()=>{
        var html = $(".list-categories").html();
        $.post("access/api-post.php", {html: html}, (dat)=>{ console.log(dat); });
    }, 200);
} // save

function renameTitleAndNotes(btn) {
    var $btn = $(btn);
    var $header = $btn.closest("header");

    var $title = $header.find(".title");
    var title = $title.text();
    var newTitle = prompt(`Rename title?`, title);
    if(newTitle!==null && newTitle!=="") {
        $title.text(newTitle, title);
    }

    var $notes = $header.find(".notes");
    var notes = $notes.text();
    var newNotes = prompt(`Change Note?`, notes);
    if(newNotes!==null && newNotes!=="") {
        $notes.text(newNotes);
    }

    setTimeout(save, 100);
} // renameTitle

function getTodayDateValues() {
    let now = moment.now();
    return {
        unix: moment(now).unix(),
        humanReadable: moment(now).format("MM/DD/YY HH:mm:ss")
    }
}

function itrPrevDate() {
    var currentDate = $("#override-date").val();
    var newDate = moment( currentDate ).subtract(1, "days").format("YYYY-MM-DD");
    $("#override-date").val(newDate);
}

function itrNextDate() {
    var currentDate = $("#override-date").val();
    var newDate = moment( currentDate ).add(1, "days").format("YYYY-MM-DD");
    $("#override-date").val(newDate);
}

$(()=>{
    var todaysDateHuman = moment().format("MM/DD/YYYY");
    var todaysDateVal = moment().format("YYYY-MM-DD"); // the plugin only accepts this format
    $("#todays-date").text(todaysDateHuman);
    $("#override-date").val(todaysDateVal);
    $(".tooltip").remove(); // Fixed Bug: Sometimes tooltips get visible and stuck on loading
})