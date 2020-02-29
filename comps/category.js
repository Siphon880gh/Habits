// Load user data
$.get("access/api-get.php", (html)=> { 
    if(html.length) $(".list-categories").html(html);
    console.log("html: " + html); 
});

function save() {
    setTimeout(()=>{
        var html = $(".list-categories").html();
        $.post("access/api-post.php", {html: html});
    }, 200);
} // save