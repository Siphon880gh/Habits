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
                $el.fadeOut(300, ()=> { $(this).remove(); });

                setTimeout(()=> { paintChains(); }, 100);
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
        setTimeout(()=> { save(); }, 200);
    })
});

function paintChains() {
    console.log("f paintChains");
    var $logContainers = $(".logs");

    // At every habit's logs containers
    $logContainers.each((i, logContainers)=>{ 
        var $logs = $(logContainers).find(".log");
        
        // At a habit's logs container's logs
        $logs.each((j, log)=>{ 
            var $current = $(log);
            var tcurrent = $current.attr("data-unix");
            tcurrent = parseInt(tcurrent);

            // Paint chain icon if there is a next node and that node's time is within the acceptable seconds parameter from the current node
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

                // Color groups
                var $log0 = $logs.eq(0);
                var tfirst = $log0.attr("data-unix");
                tfirst = parseInt(tfirst);

                var grouper = $(".msgs-container-grouper .mts-msg.active").attr("data-seconds");
                grouper = parseInt(grouper);
                var groupNum_ = Math.floor( (tcurrent-tfirst)/grouper );
                var groupNum = groupNum_ % 4;

                console.log(`node #${$current.index()} << Expected to increase over time from 0.`);
                console.log(`groupNum: ${groupNum} << Expected to increase over time then circle back to zero.`);

                $current.removeClass("color0 color1 color2 color3 color4");
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

    // Paint group color on first log
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

    // Colorize chains that are consecutive
    // var $queueChains = [];
    // var $activeChains = $(".chain-icon.active").toArray();
    // for(var i= 0; i<$activeChains.length; i++) {
    //     var $chain = $( chain[i] );
    //     var $nextActiveChain = $chain.closest(".log").next(".log").find(".chain-icon.active");
    //     var hasNextActiveChain = $nextActiveChain.length;
    //     if(hasNextActiveChain) {
    //         $queueChains.push($chain);
    //     } else {
    //         $queueChains = []; // reset
    //     }
    // } // for

} // paintChains