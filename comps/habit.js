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
    var title = $habit.find(".title").text();
    if(confirm(`Close this habit ${title}?`));
        $habit.remove();
}