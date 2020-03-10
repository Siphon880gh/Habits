function save() {
    console.log("f save");
    setTimeout(()=>{
        var html = $(".list-categories").html();
        $.post("access/api-post.php", {html: html}, (dat)=>{ console.log(dat); });
    }, 200);
} // save

function renameTitleAndNotes(btn) {
    var $btn = $(btn);
    var $header = $btn.closest("header");

    var $title = $header.find(".title");
    var title = $title.text();
    var newTitle = prompt(`Rename title?`, title);
    if(newTitle!==null && newTitle!=="") {
        $title.text(newTitle, title);
    }

    var $notes = $header.find(".notes");
    var notes = $notes.text();
    var newNotes = prompt(`Change Note?`, notes);
    if(newNotes!==null && newNotes!=="") {
        $notes.text(newNotes);
    }

    setTimeout(save, 100);
} // renameTitle