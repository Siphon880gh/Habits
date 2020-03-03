
$(".indicator-current-group-completed").livequery( (i,el)=> {
    // init
    var $el = $(el);
    var $result = $el.find(".result");
    var $habit = $el.closest(".habit");
    var lastCompleted = $habit.attr("data-last-completed-chain");
    var grouper = $(".msgs-container-grouper .mts-msg.active").attr("data-seconds");
    lastCompleted = parseInt(lastCompleted);

    // partials templates
    var $success = "Good";
    var $fail = "WIP";

    // coerce type
    var diff = moment(moment.now(), "unix").diff(lastCompleted);
    var result_ = diff/grouper;
    var result = Math.floor(result);

    if(result===0) {
        $result.html($success)
    } else {
        $result.html($fail);
    }
});