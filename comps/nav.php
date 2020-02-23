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

<script src="comps/nav.js"></script>