$(()=>{
    $(".indicator-current-group-completed").livequery(paintIndicators);
});

function paintIndicators() {
    // init
    var $results = $(".result");

    $results.each((i, result)=>{
        // init
        var $result = $(result);
        var $habit = $result.closest(".habit");
        var lastCompleted = $habit.attr("data-last-completed-chain");
        var grouperSecs = $habit.find(".msgs-container-grouper .mts-msg.active").attr("data-seconds");

        // coerce types
        lastCompleted = parseInt(lastCompleted);
        grouperSecs = parseInt(grouperSecs);

        // TODO:
        var unix_ms = moment.now();
        var unix_secs = Math.floor(unix_ms/1000);
        console.log("unix_ms: " + unix_ms);
        console.log("unix_secs: " + unix_secs);

        // Due time?
        var hasLogs = $habit.find(".log").length;
        if(!hasLogs || lastCompleted===0) {
            console.log("No logs. Simply add the group time to current time. That's how much longer until current cycle is due.");
            var diff = grouperSecs;
            var result = moment(unix_ms).add(diff, "seconds").unix();
            var daysLeft = Math.floor(parseInt(diff/86400));
        } else {
            console.log("Has logs. Find diff between last most log and current time and divide as necessary to get to the last group. That's how much longer until current cycle is due.")
            // var diff = moment(unix_secs, "unix").diff(lastCompleted);
            // var daysLeft = Math.floor(diff/grouperSecs);
            var $leftMostLog = $habit.find(".log").eq(0);
            var firstLogUnix = $leftMostLog.attr("data-unix");
            firstLogUnix = parseInt(firstLogUnix); // seconds
            firstLogUnixMs = firstLogUnix * 1000;
            // TODO:
            var diffMs = moment(unix_ms).diff(firstLogUnixMs);
            var diffSecs = diffMs/1000;
            var mixedFraction = diffSecs/grouper;
            if(Math.floor(mixedFraction)===0)
            var result_ = diff/grouperSecs;
            var result = Math.floor(result_);
            var daysLeft = Math.floor(parseInt(diff/86400));
        }

        // partials templates
        var $success = "<span class='indicator-good'>Good</span>";
        var $fail = $("<span class='indicator-wip'>WIP <span class='due-date'></span><span class='days-left-info active'></span>");
        $fail.on("click", (eventFromIndicator)=>{
            var $indicator = $(eventFromIndicator.target).closest(".habit");
            debugger;
            $indicator.find(".days-left-info").toggleClass("active");
            $indicator.find(".due-date").toggleClass("active");
            eventFromIndicator.stopPropagation();
            eventFromIndicator.preventDefault();
        }); // fail

        var daysLeftMs = daysLeft * 86400 * 1000;
        var date = moment( unix_ms + daysLeftMs ).format("MM/DD/YY")
        $fail.find(".due-date").text(`${date} due`);
        $fail.find(".days-left-info").text(`${daysLeft} days left`);

        // display
        if(daysLeft===0) {
            $result.html($success)
        } else {
            debugger;
            $result.html($fail);
        }
    });
} // paintIndicators
