function save() {
    console.log("f save");
    setTimeout(()=>{
        var html = $(".list-categories").html();
        $.post("access/api-post.php", {html: html}, (dat)=>{ console.log(dat); });
    }, 200);
} // save
