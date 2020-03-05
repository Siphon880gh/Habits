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
        var grouper = $(".msgs-container-grouper .mts-msg.active").attr("data-seconds");

        // coerce types
        lastCompleted = parseInt(lastCompleted);
        grouper = parseInt(grouper);

        // partials templates
        var $success = "<span class='indicator-good'>Good</span>";
        var $fail = "<span class='indicator-wip'>WIP</span>";

        // calculate
        var diff = moment(moment.now()/1000, "unix").diff(lastCompleted);
        var result_ = diff/grouper;
        var result = Math.floor(result_);
        // debugger;

        // display
        if(result===0) {
            $result.html($success)
        } else {
            $result.html($fail);
        }
    });
} // paintIndicators

function toggleEditMode() {
    if($(".edit-mode-component").length) {
        var willEdit = !$(".edit-mode-component").first().hasClass("active");
        if(willEdit) {
            $(".edit-mode-component").addClass("active");
        } else {
            $(".edit-mode-component").removeClass("active");
        }
    }
} // toggleEditMode