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
        save();
    } // valid
} // creatingNewCategory

/**
 * Create new habit in a category
 * @param {string} which - The name of which category? 
 * @param {string} pos - Position of category DOM where we are inserting habit
 */
function creatingNewHabit(which, pos) {
    var what = prompt(`Name the new habit in category "${which}"`);
    if(what.length && what!==null && typeof what!=="undefined") {
        // Init
        var atTop = confirm("Insert at the top?");
        var $dest = $(".category").eq(pos).find(".list-habits");

        // Grab template
        var template = $("#template-habit").html();
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

        save();
    } // valid
} // creatingNewHabit

$(document).on("show.bs.modal", "#modal-add", ()=> {
    // alert('loaded');
    var templater_dd = Handlebars.compile( $("#template-dropdown--adder").html() );
    var categories = $(".category > header").map((i, header)=>$(header).text()).toArray();
    var $select = $("#modal-add select");
    
    $select.html( templater_dd({ categories: categories }) )
    .on("change", (event)=> {
        event.stopPropagation();
        event.preventDefault();
        var i = $("#modal-add select")[0].selectedIndex;
        var option = $("#modal-add select")[0][i];
        var isUserWantsNewCategory = option.value==="new-category";
        if(isUserWantsNewCategory) {
            creatingNewCategory();
        } else {
            creatingNewHabit(option.value, i-2); // dropdown "", "Create new category", "Category 1", "Category 2" // so [0, 1, 2, 3...] // so i-2
        }
        $("#modal-add").modal("hide");
    })
}); // ondom

$(document).on("hide.bs.modal", "#modal-add", ()=> {
    $("#modal-add select").off("change"); // must
}); // ondom
