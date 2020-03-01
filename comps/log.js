$(".logs").livequery( (i, el)=>{
    var html = $("#template-logs").html();
    $(el).html( html );
});

$(".add-log").livequery( (i,el)=> {
    $(el).on("click", (el)=> {
        var $add = $(el.target);
        if(!$add.hasClass(".add-log")) $add = $add.closest(".add-log");
        // var $logs = $add.closest(".logs");
        var html = $("#template-log").html();
        var $log = $(html);
        $log.insertBefore($add);
        paintChains();
    })
});

function paintChains() {
    console.log("f paintChains");
}