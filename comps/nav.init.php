<!-- Nav -->

<style>
#nav-main {
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    min-width: 75px;
    margin: 5px 0;
    padding: 5px 5px;
    text-align: left;
    font-size: 2rem;
}
#nav-main .fa {
    margin-right: 2ch; 
}
</style>

<!-- Modal -->
<div id="modal-add" class="modal fade" role="dialog">
    <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Add category or habit</h4>
        <small>
        </p>
        <p>You can add a new area of life or add a habit under an existing area. Eg. Area "Health" -> Habit "Exercising", "Health" -> "Drinking water".</p>
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
    <option value="new-category">< Create new area of life! ></option>
    {{#each categories}}
        <option value="{{this.index}}">{{this}}</option>
    {{/each}}
</template>

<script src="comps/nav.js"></script>