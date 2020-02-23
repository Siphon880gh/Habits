<style>
nav {
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    width: 75px;
    margin: 5px 0;
    padding: 5px 5px;
}
</style>

<nav>
    <div class="fa fa-plus clickable"  data-toggle="modal" data-target="#modal-add"></div>
</nav>

<!-- Modal -->
<div id="modal-add" class="modal fade" role="dialog">
    <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Add category or goal</h4>
        <small>
        </p>
        <p>You can add a new category (such as Fitness). Or you can add a new habit by selecting a category (such as Fitness -> Exercising).</p>
        </small>
        </div>
        <div class="modal-body">
            <select>
            </select>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </div>
    </div>

    </div>
</div>

<template id="template-dropdown--adder">
    <option value=""></option>
    <option value="new-category">< Create new category! ></option>
    {{#each categories}}
        <option value="{{this}}">{{this}}</option>
    {{/each}}
</template>

<script>
function creatingNewCategory() {
    var what = prompt("What is the new category called?");
    if(what.length && what!==null && typeof what!=="undefined") {
        var sort = confirm("Insert at the top?");
        if(sort) {
            alert("Inserting to the top.");
        } else {
            alert("Inserting to the bottom.");
        }
    }
} // creatingNewCategory
function creatingNewHabit(option) {
    var where = prompt(`Name the new habit in category "${option}"`);
    if(where.length && where!==null && typeof where!=="undefined") {
        var sort = confirm("Insert at the top?");
        if(sort) {
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

</script>