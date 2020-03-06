// $(".logs").livequery( (i, el)=>{
//     var html = $("#template-logs").html();
//     $(el).html( html );
// });

$(".log").livequery( (i,el)=> {
    $(el).on("click", (ev)=> {
        var $el = $(ev.target);
        if(!$el.hasClass("log")) $el = $el.closest(".log");

        var logText = $el.find(".date").text();
        if(confirm(`Want to remove this log ${logText}?`)) {
            if(!$el.hasClass("log")) 
                $el = $el.closest(".log");

                var $habit = $el.closest(".habit");
                $habit.attr("data-last-completed-chain", 0);
                debugger;
                
                // $el.fadeOut(50, ()=> { $(this).remove(); }); // Do not fade because that just hides it
                $el.remove();
                
                setTimeout(()=> { paintChains(); }, 100);
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
        var unix_ = moment().unix();
        var humanReadable = moment.unix( unix_ ).format("MM/DD/YY HH:mm");
        // console.log(moment().diff(unix_a, unix_b));

        $log.attr("data-unix", unix_);
        $log.find(".date").text(humanReadable)
        $log.insertBefore($add);

        setTimeout(()=> { paintChains(); }, 100);
        setTimeout(()=> { paintIndicators(); }, 150);
        setTimeout(()=> { save(); }, 200);
    })
});

function paintChains() {
    console.log("f paintChains");
    var $logContainers = $(".logs");

    // At every habit's logs containers
    $logContainers.each((i, logContainer)=>{ 
        // init
        var $logContainer = $(logContainer);
        var $logs = $logContainers.find(".log");

        // validate
        if($logs.length==0) return true;

        // At a habit's logs container's logs
        $logs.each((j, log)=>{ 
            var $current = $(log);
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
                var diffSeconds = moment(tnext, "unix").diff(tcurrent);

                // AcceptableSeconds is the acceptable seconds that the user set for a chain icon to appear.
                // Compare with diffSeconds. If less than, show the chain icon. Otherwise, hide the chain icon.
                $current.find(".chain-icon").toggleClass("active", diffSeconds < acceptableSeconds);
            }; // if there is a next log

            // Group logs by color: Non-first logs
            var $log0 = $logs.eq(0);
            var tfirst = $log0.attr("data-unix");
            tfirst = parseInt(tfirst);

            var grouper = $(".msgs-container-grouper .mts-msg.active").attr("data-seconds");
            grouper = parseInt(grouper);
            var groupNum_ = Math.floor( (tcurrent-tfirst)/grouper );
            var groupNum = groupNum_ % 4;

            console.log(`node #${$current.index()} << Expected to increase over time from 0.`);
            console.log(`groupNum: ${groupNum} << Expected to increase over time then circle back to zero.`);

            $current.removeClass("color0 color1 color2 color3 color4"); // resets color
            switch (groupNum) {
                case 0: $current.addClass("color0"); break;
                case 1: $current.addClass("color1"); break;
                case 2: $current.addClass("color2"); break;
                case 3: $current.addClass("color3"); break;
                case 4: $current.addClass("color4"); break;
            } // switch

            // console.log($log);
    
        }); // logs

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

            switch (groupNum) {
                case 0: $current.addClass("color0"); break;
                case 1: $current.addClass("color1"); break;
                case 2: $current.addClass("color2"); break;
                case 3: $current.addClass("color3"); break;
                case 4: $current.addClass("color4"); break;
            } // switch

        } // next log exist
    }); 

    // Color chain icons that are consecutive
    var $queueChains = new Array();
    var $activeChains = $(".chain-icon.active").toArray();
    var goalConsecutiveChains = $(".msgs-container-goal .mts-msg.active").text();
    goalConsecutiveChains = parseInt(goalConsecutiveChains);
    console.log("goalConsecutiveChains" + goalConsecutiveChains + "<< Expect 1-8");
    if(isNaN(goalConsecutiveChains)) { 
        console.error("Error goalConsecutiveChains is not an integer."); 
        return false; 
    };
    for(var i = $activeChains.length-1; i>=0; i--) { // Right to left
        var $chain = $( $activeChains[i] );
        // if($chain.data("visited")) continue; // temp flag

        var $prevActiveChain = $chain.closest(".log").prev(".log").find(".chain-icon.active");
        var hasPrevActiveChain = $prevActiveChain.length;
        if(hasPrevActiveChain) {
            $queueChains.push($chain);
        } else {
            // debugger;
            if(goalConsecutiveChains===1 && $activeChains.length===1 && $chain.hasClass("active")) {
                var $onlyChain = $chain;
                var $onlyChainLog = $onlyChain.closest(".log");
                var color = $onlyChainLog.css("border-top-color"); 
                setLastCompletedChain($onlyChain);
                $onlyChain.css("color", color);
            } else if($activeChains.length!==1 && $queueChains.length>=goalConsecutiveChains-1) {
                $queueChains.push($chain); // on the left most active chain icon
                var $leftMostChain = $chain;
                var $leftMostChainLog = $leftMostChain.closest(".log");
                var color = $leftMostChainLog.css("border-top-color"); // color of the consecutive chain icons will be in the color of the group of the left-most chain which started the consecutive chain
                for(var j=0; j<$queueChains.length; j++) {
                    let $queueChain = $queueChains[j];
                    // if(queueChain.data("visited")) continue; // temp flag
                    setLastCompletedChain($queueChain);
                    $queueChain.css("color", color);
                    // $queueChain.data("visited", 1); // temp flag
                    console.log("Changed chain icon color");
                } // for
            } // if there are consecutive chains and we are at the end of it, color the consecutive chain per the group color

            $queueChains = new Array(); // reset
        }
        console.log($queueChains);
    } // for

    setTimeout(save, 200);

} // paintChains

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
        console.log("proc changed last completed chain attribute at habit DOM");
    }
}