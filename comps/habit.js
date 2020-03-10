$(".habit").livequery( (i,el)=>{
    $(".list-habits").sortable({handle:".handle-habit", opacity: 0.5}).disableSelection();
})

$(".habit .msgs-container-grouper .msgs").livequery( (i, el)=>{
    initMultiTextStates(el);

    $(el).on("click", ()=> {
        setTimeout(()=> { paintChains(); }, 100);
        setTimeout(()=> { paintIndicators(); }, 150);
        setTimeout(()=> { save(); }, 200);
    });
});

$(".habit .msgs-container-chainer .msgs").livequery( (i, el)=>{
    initMultiTextStates(el);

    $(el).on("click", ()=> {
        setTimeout(()=> { paintChains(); }, 100);
        setTimeout(()=> { paintIndicators(); }, 150);
        setTimeout(()=> { save(); }, 200);
    });
});

$(".habit .msgs-container-goal .msgs").livequery( (i, el)=>{
    initMultiTextStates(el);

    $(el).on("click", ()=> {
        setTimeout(()=> { paintChains(); }, 100);
        setTimeout(()=> { paintIndicators(); }, 150);
        setTimeout(()=> { save(); }, 200);
    });
});

function closeHabit(btnInstance) {
    var $btn = $(btnInstance);
    var $habit = $btn.closest(".habit");
    var title = $habit.find("header .title").first().text();
    if(confirm(`Close this habit ${title}?`)) {
        $habit.remove();
        setTimeout(save, 100);
    }
}

function toggleCollapseAtHabit(btn) {
    var $el = $(btn);
    var $habit = $el.closest(".habit");
    var $collapsable = $habit.find(".collapsable");
    var isCollapsed = $collapsable.first().hasClass("collapsed");
    if(isCollapsed) $collapsable.removeClass("collapsed");
    else $collapsable.addClass("collapsed");
}