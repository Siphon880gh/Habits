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
        <h4 class="modal-title">Add collection or habit</h4>
        <small>
        <p>
            You can create a collection or a habit. A collection can contain habits. You may name a collection, eg. Improving health. Then you may add habits in that collection, eg. Drink 8 cups water, or eg. Exercise. If there are no collections, then you cannot create habits until you create a collection. At the main screen, you can schedule the frequency and time period for tracking habits and keeping consistent.
        </p>
        </small>
        </div>
        <div class="modal-body">
            <div id="ui-create-collection">
                <label for="">Create:</label>
                <button class="btn btn-default" onclick="creatingNewCategory();">New collection</button>
            </div>
            <div id="ui-create-habit">
                <br/>
                <span style="display:inline-block;">&nbsp;</span>
                <hr style="width:30px; display:inline-block; margin:0; padding-top:5px; padding-right:5px;">
                <span style="display:inline-block; font-style: italic;"> Or </span>
                <hr style="width:30px; display:inline-block; margin:0; padding-top:5px; padding-left:5px;"><br/>
                <br/>

                <label for="">Create habit inside a collection</label>
                <select>
                </select>
            </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </div>
    </div>

    </div>
</div>

<template id="template-dropdown--adder">
    <option value=""></option>
    {{#each categories}}
        <option value="{{this.index}}">{{this}}</option>
    {{/each}}
</template>

<script src="comps/nav.js"></script>