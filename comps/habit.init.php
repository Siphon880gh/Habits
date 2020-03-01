<?php if(isset($comps_habit)) return; ?>

<template id="template-habit">
    <div class="habit">
        <header><span class="title">${Habit Untitled}$</span></header>
        <nav>
            <div class="msgs-container msgs-container-grouper">
                <span class="msgs-label">Group logs by color (eg. weekly etc): </span>
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
                <span class="msgs-label">Chain logs when between: </span>
                <span class="msgs" style="cursor:pointer;">
                    <span style="display:inline;">24h</span>
                    <span style="display:none;">48h</span>
                    <span style="display:none;">72h</span>
                </span>
            </div>

            <div class="msgs-container msgs-container-chain-goal">
                <span class="msgs-label">Desired consecutive chains in a group: </span>
                <span class="msgs" style="cursor:pointer;">
                    <span style="display:inline;">1</span>
                    <span style="display:none;">2</span>
                    <span style="display:none;">3</span>
                    <span style="display:none;">4</span>
                    <span style="display:none;">5</span>
                    <span style="display:none;">6</span>
                    <span style="display:none;">7</span>
                    <span style="display:none;">8</span>
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