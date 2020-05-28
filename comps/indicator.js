$(()=>{
    $(".indicator-current-group-completed").livequery(paintIndicators);
});

function paintIndicators() {
    // init
    var $results = $(".result");

    $results.each((i, result)=>{

        // Traverse DOM
        var $result = $(result);
        var $habit = $result.closest(".habit");
        // debugger;
        // var $current = $(".habit").first().find(".log").last();
        var $current = $habit.find(".log").last();
        // console.log($current.length);
        if($current.length===0) return true;
        var $temp = $("<div></div>");
        $temp.append($current.clone());
        // debugger;

        while(true) {
            var $prev = $current.prev();
            if($prev.length===0) break;

            var class1 = $current[0].className;
            var class2 = $prev[0].className;
            console.log(`%cclass1 vs class2 traversing from last log to previous log: %c${class1} vs ${class2}`, "font-weight:600;", "font-weight:500;");
            // debugger;

            if(class1===class2) { 
                $temp.append($prev.clone()); 
                $current = $prev; 
            } else {
                break;
            }

        } // while traversing
        // debugger;

        var goalChains = parseInt($habit.find(".msgs-container-goal .mts-msg.active").text());
        var actualChains = $temp.find(".chain-icon.active").length;

        if(actualChains>=goalChains) {
            var $good = $("<span class='indicator-good'>Good</span>");
            $result.html($good);
        } else {
            var $fail = $("<span class='indicator-wip'>WIP due <span class='due-date active'></span>");
            var shiftCycle = $habit.find(".msgs-container-grouper .mts-msg.active").data("seconds");

            // In the current cycle:
            var $oldest = $temp.find(".log").last();
            var $recent = $temp.find(".log").first();

            var unixNextCycle = $oldest.data("unix") + shiftCycle;
            var dateNextCycle = moment.unix(unixNextCycle).format("MM/DD/YY");
            $fail.find(".due-date").text(dateNextCycle);
            $result.html($fail);
            // debugger;
        }

        return false;

        // Below code tells you how many hours or days left but is broken because it gives false negatives/positives
        // init
        var $result = $(result);
        var $habit = $result.closest(".habit");
        var lastCompleted = $habit.attr("data-last-completed-chain");
        var grouperSecs = $habit.find(".msgs-container-grouper .mts-msg.active").attr("data-seconds");

        // coerce types
        lastCompleted = parseInt(lastCompleted);
        grouperSecs = parseInt(grouperSecs);
        grouperMs = grouperSecs * 1000;

        // different units required for calculations
        var unix_ms = moment.now();
        var unix_secs = Math.floor(unix_ms/1000);
        // console.log("unix_ms: " + unix_ms); //eg. 1583804314588
        // console.log("unix_secs: " + unix_secs); //1583804314

        var isRecentlyCompletedChain = moment(unix_ms).diff(lastCompleted * 1000) <= grouperMs;
        if(isRecentlyCompletedChain) var daysLeft = 0;

        if(!isRecentlyCompletedChain) {
            var hasLogs = $habit.find(".log").length;
            if(!hasLogs) { // can start now because no log
                console.log("No logs. How many days due is exactly grouper because you can start now.");
                var daysLeft = (parseInt(grouperSecs/86400)).toFixed(0);
            } else if(hasLogs) { // some time possibly a few days ago starts the grouper, or today starts the grouper
                console.log("Has logs but NOT a recently completed chain within this grouper time period. Find diff between left-most log aka first log against current time and divide as necessary to get to the last group. How much left from the last group is how much longer until current cycle is due.")
                var $leftMostLog = $habit.find(".log").eq(0);
                var firstLogUnixSecs = parseInt( $leftMostLog.attr("data-unix") ); // seconds
                firstLogUnixMs = firstLogUnixSecs * 1000;

                var diffMs = moment(unix_ms).diff(firstLogUnixMs); // difference between today and first log
                var diffSecs = diffMs/1000;
                var mixedFraction = diffSecs/grouperSecs;
                var fractionalPart = mixedFraction % 1;
                var remainingFractionPart = 1-fractionalPart;
                // if(1<=remainingFractionPart<.95)
                //     var daysLeft = 0;
                // else
                var daysLeft = ((remainingFractionPart * grouperSecs)/86400).toFixed(2);
            }
        } // old last completed chain

        // partial templates
        var $good = $("<span class='indicator-good'>Good</span>");
        var $fail = $("<span class='indicator-wip'>WIP <span class='due-date'></span><span class='days-left-info active'></span>");
        $fail.on("click", (eventFromIndicator)=>{
            var $indicator = $(eventFromIndicator.target).closest(".habit");
            $indicator.find(".days-left-info").toggleClass("active");
            $indicator.find(".due-date").toggleClass("active");
            eventFromIndicator.stopPropagation();
            eventFromIndicator.preventDefault();
        }); // fail

        var daysLeftMs = daysLeft * 86400 * 1000;
        var date = moment( unix_ms + daysLeftMs ).format("MM/DD/YY");
        $fail.find(".due-date").text(`${date} due`);

        if(!isRecentlyCompletedChain) {
            if(!hasLogs) {
                $fail.find(".days-left-info").text(`${daysLeft} days left`);
            } else if(hasLogs) {
                var partialDays = Math.floor(daysLeft);
                var partialHours = daysLeft%1;
                if(partialDays > 0) partialDays = `${partialDays.toFixed(0)} days `;
                else partialDays = "";
                if(partialHours>0) partialHours = `${partialHours.toFixed(2)} hrs `;
                else partialHours = "";
                $fail.find(".days-left-info").text(`${partialDays}${partialHours}left`);
            }
        } // preparing display

        // console.log("isRecentlyCompletedChain: ", isRecentlyCompletedChain);
        // console.log("daysLeft: ", daysLeft);

        // display
        if(isRecentlyCompletedChain || daysLeft===0) {
            $result.html($good)
        } else {
            $result.html($fail);
        }
    });
} // paintIndicators
