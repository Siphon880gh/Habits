// $(".logs").livequery( (i, el)=>{
//     var html = $("#template-logs").html();
//     $(el).html( html );
// });

$(()=>{
    (function windowOnloadFadeOldLogs() {

        $(".log").each( (i,el)=> {
            // debugger;
            let now = 0;
            if(isOverriddenDate()) {
                now = getOverriddenDateValues().unix;
            } else {
                now = getTodayDateValues().unix;
            }
            let logDate = $(el).attr("data-unix");
            logDate = parseInt(logDate);
            let lastWeek = moment(now*1000).subtract(86400*1000*7).unix();
            let lastWeekPlus7Days = moment(lastWeek*1000).add(86400*1000*7).unix();
            if(logDate<lastWeek) {
                $(el).addClass("faded");
            }
        }); // foreach
    })();
});

$(".log").livequery( (i,el)=> {
    // console.log("aa");
    let now = 0;
    if(isOverriddenDate()) {
        now = getOverriddenDateValues().unix;
    } else {
        now = getTodayDateValues().unix;
    }
    let logDate = $(el).attr("data-unix");
    logDate = parseInt(logDate);
    let lastWeek = moment(now*1000).subtract(86400*1000*7).unix();
    let lastWeekPlus7Days = moment(lastWeek*1000).add(86400*1000*7).unix();
    if(logDate<lastWeek) {
        $(el).addClass("faded");
    }
    // debugger;

    $(el).on("click", (ev)=> {
        var $el = $(ev.target);
        if(!$el.hasClass("log")) $el = $el.closest(".log");

        var logText = $el.find(".date").text();
        if(confirm(`Want to remove this log ${logText}?`)) {
            if(!$el.hasClass("log")) 
                $el = $el.closest(".log");

                var $habit = $el.closest(".habit");
                $habit.attr("data-last-completed-chain", 0);
                
                // $el.fadeOut(50, ()=> { $(this).remove(); }); // Do not fade because that just hides it
                $el.remove();
                
                setTimeout(()=> { paintLogsAndChains(); }, 100);
                setTimeout(()=> { paintIndicators(); }, 150);
                setTimeout(()=> { save(); }, 200);
        } // want to remove
    }); // click => remove
});

$(".add-log").livequery( (i,el)=> {
    $(el).on("click", (ev)=> {
        var $add = $(ev.target);
        if(!$add.hasClass(".add-log")) $add = $add.closest(".add-log");
        // var $logs = $add.closest(".logs");
        var html = $("#template-log").html();
        var $log = $(html);

        // Time functions
        let unix = moment().unix();
        let humanReadable = moment.unix( unix ).format("MM/DD/YY HH:mm:ss");
        // console.log(moment().diff(unix_a, unix_b));

        if(isOverriddenDate()) {
            unix = getOverriddenDateValues().unix;
            humanReadable = getOverriddenDateValues().humanReadable;
        }

        $log.attr("data-unix", unix);
        $log.find(".date").text(humanReadable)
        $log.insertBefore($add);

        setTimeout(()=> { paintLogsAndChains(); }, 100);
        setTimeout(()=> { paintIndicators(); }, 150);
        setTimeout(()=> { save(); }, 200);
    })
});

function paintLogsAndChains() {
    // console.log("f paintLogsAndChains");
    var $logContainers = $(".logs");
    $(".tooltip").remove(); // Fixed Bug: Sometimes tooltips get visible and stuck on loading

    // At every habit's logs container
    $logContainers.each((i, logContainer)=>{ 
        // init
        var $logContainer = $(logContainer);
        var $logs = $logContainers.find(".log");
        $logs.find(".chain-icon").css("color", "black").removeClass("active").text("");
        $logs.removeClass("color0 color1 color2 color3 color4");
        // debugger;
        
        // validate
        if($logs.length==0) return true;
        
        $logs.each((j, log)=>{ 

            var $current = $(log);
            
            // Set bootstrap tooltips:
            var todaysDate = moment($("#override-date").val()).format("MM/DD/YY");
            $current.attr({"title":todaysDate,"data-placement":"bottom"}).tooltip();

            // Set attributes
            var tcurrent = $current.attr("data-unix");
            tcurrent = parseInt(tcurrent);

            // Render chain icon if there is a next node and that node's time is within the acceptable seconds from the current node
            if($current.next(".log").length) { // left to right
                var $next = $current.next(".log");

                // get acceptable seconds
                var acceptableSeconds =  0;
                $chainer = $current.closest(".habit").find(".msgs-container-chainer .mts-msg.active");
                if($chainer.length) {
                    acceptableSeconds = $chainer.attr("data-seconds");
                    acceptableSeconds = parseInt(acceptableSeconds); // reassert data type
                }

                // time current vs time next
                var tnext = $next.attr("data-unix");
                tnext = parseInt(tnext);
                var diffSeconds = moment(tnext*1000).diff(tcurrent*1000)/1000;
                // console.log("diffSeconds", diffSeconds);

                // AcceptableSeconds is the acceptable seconds that the user set for a chain icon to appear.
                // Compare with diffSeconds. If less than, show the chain icon. Otherwise, hide the chain icon.
                var isMetParamsForChainIcon = diffSeconds < acceptableSeconds;
                $current.find(".chain-icon").toggleClass("active", isMetParamsForChainIcon);
                // if(isMetParamsForChainIcon) console.log("Drawn outline of chain icon");
            }; // if there is a next log

            // Group logs by color: Non-first logs
            var $log0 = $logs.eq(0);
            var tfirst = $log0.attr("data-unix");
            tfirst = parseInt(tfirst);

            var grouper = $(".msgs-container-grouper .mts-msg.active").attr("data-seconds");
            grouper = parseInt(grouper);
            // console.log("tcurrent-tfirst: " + `${tcurrent}-${tfirst}`);
            var cycleNum = Math.floor( (tcurrent-tfirst)/grouper );
            // var groupNum = cycleNum % 4;

            $current.attr("data-cycle-num", cycleNum);
            $current.removeClass("color0 color1 color2 color3 color4"); // resets color

        }); // logs of a logsContainer

        var cycleNums = $logs.toArray().map( function(el,i) {
            return {
                $dom: $(el),
                num: $(el).attr("data-cycle-num")
            } // return
        }); // cycleNums

        cycleNums.forEach( (cycleNum, i) => {
            cycleNums[i].color = (() => {
                if(i===0) return "color0";
                // debugger;
                var lastColor = cycleNums[i-1].color;
                var lastCycleNum = cycleNums[i-1].num;
                var currentCycleNum = cycleNums[i].$dom.attr("data-cycle-num");
                
                if(lastCycleNum!==currentCycleNum) {
                    var colorIndex = parseInt(lastColor[lastColor.length-1]);
                    // debugger;
                    return `color${colorIndex+1}`; // new color group
                } else {
                    return lastColor; // same color group
                }
            })( i );
        });

        cycleNums.forEach( cycleNum=> {
            var colorClass = cycleNum.color;
            var $dom = cycleNum.$dom;
            $dom.addClass(colorClass);
        });

    }); // logsContainer

    // Group logs by color: First logs
    var $firstLogs = $(".logs > .log:first-child()");
    $firstLogs.each((i, firstLog)=>{
        var $firstLog = $(firstLog);

        if($firstLog.next(".log").length) {
            var $current = $firstLog;
            var $next = $current.next(".log");

            // time current vs time prev
            var tcurrent = $current.attr("data-unix");
            var tnext = $next.attr("data-unix");
            tcurrent = parseInt(tcurrent);
            tnext = parseInt(tnext);
            var diffSeconds = moment(tnext, "unix").diff(tcurrent);

            var grouper = $(".msgs-container-grouper .mts-msg.active").attr("data-seconds");
            grouper = parseInt(grouper);
            var groupNum_ = Math.floor( (diffSeconds)/grouper );
            var groupNum = groupNum_ % 4;

            // console.log(`groupNum: ${groupNum} << Expected to increase over time then circle back to zero.`);
            $current.removeClass("color0 color1 color2 color3 color4");

            // Color left-most log
            switch (groupNum) {
                case 0: $current.addClass("color0"); break;
                case 1: $current.addClass("color1"); break;
                case 2: $current.addClass("color2"); break;
                case 3: $current.addClass("color3"); break;
                case 4: $current.addClass("color4"); break;
            } // switch
            // console.log("Colored a log");

        } // next log exist
    }); 

    // Color chain icons that are consecutive at every habit's logs container
    let countingConsecutiveChains = 1;
    $logContainers.each((i, logContainer)=>{ 
        var $queueChains = new Array();
        var $logContainer = $(logContainer);
        var $activeChains = $logContainer.find(".chain-icon.active").toArray();
        var goalConsecutiveChains = $logContainer.closest(".habit").find(".msgs-container-goal .mts-msg.active").text();
        goalConsecutiveChains = parseInt(goalConsecutiveChains);
        // console.log("goalConsecutiveChains " + goalConsecutiveChains + "<< Expect 1-8");
        if(isNaN(goalConsecutiveChains)) { 
            console.error("Error goalConsecutiveChains is not an integer."); 
            return false; 
        };

        // var prevChainVisited = false;
        for(var i = $activeChains.length-1; i>=0; i--) { // Right to left
            var $chain = $( $activeChains[i] );
            // if($chain.data("visited")) continue; // temp flag

            if(goalConsecutiveChains===1) {
                var $onlyChain = $chain;
                var $onlyChainLog = $onlyChain.closest(".log");
                var color = $onlyChainLog.css("border-top-color"); 
                setLastCompletedChain($onlyChain);
                $onlyChain.css("color", color);

                // console.log("setLastCompletedChain when active chains is 1");
                $queueChains = new Array();
                continue;
            }

            var $l_ActiveChain = $chain.closest(".log").prev(".log").find(".chain-icon.active");
            var $r_ActiveChain = $chain.closest(".log").next(".log").find(".chain-icon.active");
            if($l_ActiveChain.length) {
                $queueChains.push($chain);
                $chain.html(`<br/>${countingConsecutiveChains}`);
                countingConsecutiveChains++;
            } else if($r_ActiveChain.length) {
                $queueChains.push($chain);
                $chain.html(`<br/>${countingConsecutiveChains}`);
                countingConsecutiveChains = 1;
                // debugger;
                // if(goalConsecutiveChains===1 && $activeChains.length===1 && $chain.hasClass("active")) {
                //     var $onlyChain = $chain;
                //     var $onlyChainLog = $onlyChain.closest(".log");
                //     var color = $onlyChainLog.css("border-top-color"); 
                //     setLastCompletedChain($onlyChain);
                //     $onlyChain.css("color", color);
                //     console.log("setLastCompletedChain when active chains is1");
                // if($activeChains.length!==1 && $queueChains.length>=goalConsecutiveChains) {
                if($queueChains.length>=goalConsecutiveChains) {
                    // $queueChains.push($chain); // on the left most active chain icon
                    var $leftMostChain = $chain;
                    var $leftMostChainLog = $leftMostChain.closest(".log");
                    var color = $leftMostChainLog.css("border-top-color"); // color of the consecutive chain icons will be in the color of the group of the left-most chain which started the consecutive chain
                    for(var j=0; j<$queueChains.length; j++) {
                        let $queueChain = $queueChains[j];
                        // if(queueChain.data("visited")) continue; // temp flag
                        setLastCompletedChain($queueChain);
                        // console.log("setLastCompletedChain when active chains >1");
                        $queueChain.css("color", color);
                        // $queueChain.data("visited", 1); // temp flag
                        // console.log("Colored chain icon");
                    } // for
                } // if there are consecutive chains and we are at the end of it, color the consecutive chain per the group color

                $queueChains = new Array(); // reset
            }
            // console.log($queueChains);
        } // for
    });

    setTimeout(save, 200);

} // paintLogsAndChains

function setLastCompletedChain($lastCompletedChain) {
    // components
    var $habit = $lastCompletedChain.closest(".habit");
    var lastCompletedChain_old = $habit.attr("data-last-completed-chain");
    var lastCompletedChain_new = $lastCompletedChain.closest(".log").attr("data-unix");

    // coerce types
    lastCompletedChain_old = parseInt(lastCompletedChain_old);
    lastCompletedChain_new = parseInt(lastCompletedChain_new);

    // validate
    if(isNaN(lastCompletedChain_old)) { console.error("Error: lastCompletedChain_old not an integer"); return true; }
    if(isNaN(lastCompletedChain_new)) { console.error("Error: lastCompletedChain_new not an integer"); return true; }

    if(lastCompletedChain_new > lastCompletedChain_old) {
        $habit.attr("data-last-completed-chain", lastCompletedChain_new);
        // console.log("proc changed last completed chain attribute at habit DOM");
    }
}