function closeCategory(btnInstance) {
    var $btn = $(btnInstance);
    var $category = $btn.closest(".category");
    var title = $category.find(".title").text();
    if(confirm(`Close this category ${title}?`)) {
        $category.remove();
        setTimeout(save, 100);
    }
}