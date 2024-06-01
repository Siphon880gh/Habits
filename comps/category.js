$(".category").livequery( (i,el)=>{
    $(".list-categories").sortable({handle:".handle-category", opacity: 0.5}).disableSelection();
})

function closeCategory(btnInstance) {
    var $btn = $(btnInstance);
    var $category = $btn.closest(".category");
    var title = $category.find("header .title").first().text();
    if(confirm(`Close this category ${title}?`)) {
        $category.remove();
        setTimeout(save, 100);
    }
}

function toggleCollapseAtCategory(btn) {
    var $el = $(btn);
    var $habit = $el.closest(".category");
    var $collapsable = $habit.find(".collapsable");
    var isCollapsed = $collapsable.first().hasClass("collapsed");
    if(isCollapsed) $collapsable.removeClass("collapsed");
    else $collapsable.addClass("collapsed");
}