function save() {
    console.log("f save");
    setTimeout(()=>{
        var html = $(".list-categories").html();
        $.post("access/api-post.php", {html: html}, (dat)=>{ console.log(dat); });
    }, 200);
} // save

function closeCategory(btnInstance) {
    var $btn = $(btnInstance);
    var $habit = $btn.closest(".category");
    var title = $habit.find(".title").text();
    if(confirm(`Close this category ${title}?`));
        $habit.remove();
}