function toggleEditMode(btn) {
    var isEditMode = $(".edit-mode-component").first().hasClass("active"); 
    if(isEditMode) {
        $(".edit-mode-component").removeClass("active");
        $(btn).removeClass("text-red");
    } else {
        $(".edit-mode-component").addClass("active");
        $(btn).addClass("text-red");
    }
} // toggleEditMode

function creatingNewCategory() {
    var what = prompt("What is the new collection called?");
    if(what!==null && what.length && typeof what!=="undefined") {
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
        $("#modal-add").modal("hide");
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
    var categories = $(".category > header > .title").map((i, title)=>$(title).text()).toArray();
    var $select = $("#modal-add select");
    if(categories.length===0) $("#ui-create-habit").hide();
    else $("#ui-create-habit").show();
    
    $select.html( templater_dd({ categories: categories }) )
    .on("change", (event)=> {
        event.stopPropagation();
        event.preventDefault();
        var i = $("#modal-add select")[0].selectedIndex;
        var option = $("#modal-add select")[0][i];
        creatingNewHabit(option.text, i-1); // dropdown "", "Create new category", "Category 1", "Category 2" // so [0, 1, 2, 3...] // so i-2
        $("#modal-add").modal("hide");
    })
}); // ondom

$(document).on("hide.bs.modal", "#modal-add", ()=> {
    $("#modal-add select").off("change"); // must
}); // ondom
