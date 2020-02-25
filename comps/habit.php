<template id="template-habit">
    <div class="habit">
        <header><span class="title">Habit Untitled</span></header>
        <nav>
            <div class="msgs-container msgs-container-grouper">
                <span class="msgs-label">Grouper (eg. weekly etc): </span>
                <span class="msgs" style="cursor:pointer;">
                    <span style="display:inline;">Weekly</span>
                    <span style="display:none;">Monthly</span>
                    <span style="display:none;">2-weekly</span>
                    <span style="display:none;">3-weekly</span>
                    <span style="display:none;">24h</span>
                    <span style="display:none;">48h</span>
                    <span style="display:none;">72h</span>
                </span>
            </div>
            <div class="msgs-container msgs-container-chainer">
                <span class="msgs-label">Chainer: </span>
                <span class="msgs" style="cursor:pointer;">
                    <span style="display:inline;">24h</span>
                    <span style="display:none;">48h</span>
                    <span style="display:none;">72h</span>
                </span>
            </div>
        </nav>
        <div class="contents"></div>
    </div>
</template>

<script src="comps/habit.js"></script>