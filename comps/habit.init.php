<?php if(isset($comps_habit)) return; ?>

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
.nav-habit {
    position: absolute;
    top: 0;
    right: 5px;
}
</style>

<template id="template-habit">
    <div class="habit" data-last-completed-chain="0">
        <nav class="nav-habit edit-mode-component"><span class="fa fa-close clickable" onclick="closeHabit(this);"></span></nav>
        <header>
            <span class="title">${Habit Untitled}$</span>
            <?php include("comps/indicator.php"); ?>
        </header>

        <nav>
            <!-- Grouper aka group together logs -->
            <div class="msgs-container msgs-container-grouper">
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
            <div class="msgs-container msgs-container-chainer">
                <span class="msgs-label">Chain logs when between: </span>
                <span class="msgs clickable">
                    <span class="mts-msg active" data-seconds="86400">24h</span>
                    <span class="mts-msg" data-seconds="172800">48h</span>
                    <span class="mts-msg" data-seconds="259200">72h</span>
                </span>
            </div>

            <!-- Goal is how many chains in a group -->
            <div class="msgs-container msgs-container-goal">
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
        <div class="logs">
            <?php include("comps/log.php"); ?>
        </div>
    </div>
</template>

<script src="comps/habit.js"></script>


<?php $comps_habit=1; ?>