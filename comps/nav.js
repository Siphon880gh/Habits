function creatingNewCategory() {
    var what = prompt("What is the new category called?");
    if(what.length && what!==null && typeof what!=="undefined") {
        // Init
        var atTop = confirm("Insert at the top?");
        var $dest = $(".list-categories");

        // Grab template
        var template = $("#template-category").html();
        var $template = $(template);

        // Modify template
        $template.find("header .title").text(what);

        if(atTop) {
            // alert("Inserting to the top.");
            $dest.prepend($template);
        } else {
            // alert("Inserting to the bottom.");
            $dest.append($template);
        }
    }
} // creatingNewCategory

/**
 * Create new habit in a category
 * @param {string} which - Which category to insert new habit at?
 */
function creatingNewHabit(which) {
    var what = prompt(`Name the new habit in category "${which}"`);
    if(what.length && what!==null && typeof what!=="undefined") {
        // Init
        var atTop = confirm("Insert at the top?");

        // Grab template
        var template = $("#template-habit").html();
        var $template = $(template);

        // Modify template
        $template.find("header .title").text(what);

        if(atTop) {
            alert("Inserting to the top.");
        } else {
            alert("Inserting to the bottom.");
        }
    }
} // creatingNewHabit


    $(document).on("show.bs.modal", "#modal-add", ()=> {
        // alert('loaded');
        var templater = Handlebars.compile( $("#template-dropdown--adder").html() );
        var categories = $(".category > header").map((i, header)=>$(header).text()).toArray();
        var $select = $("#modal-add select");
        
        $select.html( templater({ categories: categories }) )
        .on("change", (event)=> {
            event.stopPropagation();
            event.preventDefault();
            var i = $("#modal-add select")[0].selectedIndex;
            var option = $("#modal-add select")[0][i];
            var isUserWantsNewCategory = option.value==="new-category";
            if(isUserWantsNewCategory) {
                creatingNewCategory();
            } else {
                creatingNewHabit(option.value);
            } 
            $("#modal-add").modal("hide");
        })
    }); // ondom

    $(document).on("hide.bs.modal", "#modal-add", ()=> {
        $("#modal-add select").off("change"); // must
    }); // ondom

$(()=>{
});