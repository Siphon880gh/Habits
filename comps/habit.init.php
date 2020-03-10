<!-- Habit -->

<style>
.habit nav .msgs .msg.active {
    display: inline;
}
.habit nav .msgs .msg:not(.active) {
    display: none;
}
.habit {
    position: relative;
}
.habit .notes {
    color: darkgray;
}
.nav-habit {
    position: absolute;
    top: 0;
    right: 5px;

    border-left-width: 1px;
    border-left-color: darkgray;
    border-left-style: solid;
    padding-left: 3px;
    border-bottom-width: 1px;
    border-bottom-color: darkgray;
    border-bottom-style: solid;
}
</style>

<template id="template-habit">
    <div class="habit" data-last-completed-chain="0">
        <nav class="nav-habit edit-mode-component">
            <div class="fa fa-close clickable" onclick="closeHabit(this);"></div><br/>
            <div class="handle-habit fa fa-arrows-alt clickable"></div><br/>
            <div class="fa fa-minus clickable" onclick="toggleCollapseAtHabit(this);"></div>
        </nav>
        <header>
            <span class="title" onblur="save();">${Habit Untitled}$</span><span class="title-rename fa fa-edit edit-mode-component clickable" onclick="renameTitleAndNotes(this)"></span>
            <?php include("comps/indicator.php"); ?>
            <div class="notes" contenteditable="true" onblur="save();">No notes</div>
        </header>

        <nav>
            <!-- Grouper aka group together logs -->
            <div class="msgs-container msgs-container-grouper collapsable">
                <span class="msgs-label">Group logs by color: </span>
                <span class="msgs clickable">
                    <span class="mts-msg active" data-seconds="604800">Weekly</span>
                    <span class="mts-msg" data-seconds="2419200">Monthly</span>
                    <span class="mts-msg" data-seconds="1209600">2-weekly</span>
                    <span class="mts-msg" data-seconds="1814400">3-weekly</span>
                    <span class="mts-msg" data-seconds="86400">24h</span>
                    <span class="mts-msg" data-seconds="172800">48h</span>
                    <span class="mts-msg" data-seconds="259200">72h</span>
                </span>
            </div>

            <!-- Chainer creates chain icons -->
            <div class="msgs-container msgs-container-chainer collapsable">
                <span class="msgs-label">Chain logs when between: </span>
                <span class="msgs clickable">
                    <span class="mts-msg active" data-seconds="86400">24h</span>
                    <span class="mts-msg" data-seconds="172800">48h</span>
                    <span class="mts-msg" data-seconds="259200">72h</span>
                </span>
            </div>

            <!-- Goal is how many chains in a group -->
            <div class="msgs-container msgs-container-goal collapsable">
                <span class="msgs-label">Desired consecutive chains in a group: </span>
                <span class="msgs clickable">
                    <span class="mts-msg active">1</span>
                    <span class="mts-msg">2</span>
                    <span class="mts-msg">3</span>
                    <span class="mts-msg">4</span>
                    <span class="mts-msg">5</span>
                    <span class="mts-msg">6</span>
                    <span class="mts-msg">7</span>
                    <span class="mts-msg">8</span>
                </span>
            </div>

        </nav>
        <div class="logs collapsable">
            <?php include("comps/log.php"); ?>
        </div>
    </div>
</template>

<script src="comps/habit.js"></script>