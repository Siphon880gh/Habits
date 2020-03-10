<!-- Category -->

<style>
.category {
    position: relative;
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
        <header><span class="title">${Category Untitled}$</span></header>
        <div class="list-habits">
        </div>
    </div>
</template>

<script src="comps/category.js"></script>