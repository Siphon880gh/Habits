<!-- Category -->

<style>
.category {
    position: relative;
}
.category .notes {
    color: darkgray;
}
.nav-category {
    position: absolute;
    top: 0;
    right: 5px;
}
</style>

<template id="template-category">
    <div class="category">
        <nav class="nav-category edit-mode-component">
            <div class="fa fa-close clickable" onclick="closeCategory(this);"></div><br/>
            <div class="fa fa-arrows-alt clickable"></div><br/>
            <div class="fa fa-minus clickable" onclick="toggleCollapseAtCategory(this);"></div>
        </nav>
        <header>
            <span class="title" contenteditable="true" onblur="save();">${Category Untitled}$</span>
            <div class="notes" contenteditable="true" onblur="save();">No notes</div>
        </header>

        <div class="list-habits"></div>
    </div>
</template>

<script src="comps/category.js"></script>