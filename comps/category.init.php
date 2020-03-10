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
        <nav class="nav-category edit-mode-component"><span class="fa fa-close clickable" onclick="closeCategory(this);"></span></nav>
        <header>
            <span class="title" contenteditable="true" onblur="save();">${Category Untitled}$</span>
            <div class="notes" contenteditable="true" onblur="save();">No notes</div>
        </header>

        <div class="list-habits"></div>
    </div>
</template>

<script src="comps/category.js"></script>